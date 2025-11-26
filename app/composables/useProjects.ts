import type { Project, ProjectCategory, ProjectType } from "~/data";
import { projects, projectTypes } from "~/data";

export const useProjects = () => {
  const route = useRoute();
  const router = useRouter();

  const {
    trackProjectFilterClick,
    trackProjectSearch,
    trackProjectClearFilters,
  } = useAnalytics();

  const getInitialSearch = (): string => {
    const q = route.query.q;
    return typeof q === "string" ? q : "";
  };

  const getInitialTypes = (): ProjectType[] => {
    const types = route.query.type;
    if (!types) return [];
    const typeArray = typeof types === "string" ? types.split(",") : types;
    const validTypes = projectTypes.map((t) => t.value);
    return typeArray.filter((t): t is ProjectType =>
      validTypes.includes(t as ProjectType)
    );
  };

  const getInitialTechs = (): string[] => {
    const techs = route.query.tech;
    if (!techs) return [];
    return typeof techs === "string" ? techs.split(",") : (techs as string[]);
  };

  const searchQuery = ref(getInitialSearch());
  const selectedTypes = ref<ProjectType[]>(getInitialTypes());
  const selectedTechs = ref<string[]>(getInitialTechs());
  const searchDebounceTimeout = ref<NodeJS.Timeout | null>(null);

  const updateUrlQuery = () => {
    const query: Record<string, string | undefined> = {};

    if (searchQuery.value) {
      query.q = searchQuery.value;
    }
    if (selectedTypes.value.length > 0) {
      query.type = selectedTypes.value.join(",");
    }
    if (selectedTechs.value.length > 0) {
      query.tech = selectedTechs.value.join(",");
    }

    router.replace({ query });
  };

  watch([searchQuery, selectedTypes, selectedTechs], updateUrlQuery, {
    deep: true,
  });

  const availableTypes = computed(() => {
    const types = new Set(projects.map((p) => p.type));
    return projectTypes.filter((t) => types.has(t.value));
  });

  const availableTechs = computed(() => {
    const techs = new Set<string>();
    projects.forEach((p) => p.stack.forEach((t) => techs.add(t)));
    return Array.from(techs).sort();
  });

  const hasActiveFilters = computed(() => {
    return (
      searchQuery.value !== "" ||
      selectedTypes.value.length > 0 ||
      selectedTechs.value.length > 0
    );
  });

  const toggleTypeFilter = (type: ProjectType) => {
    const index = selectedTypes.value.indexOf(type);
    const willBeSelected = index === -1;

    if (willBeSelected) {
      selectedTypes.value.push(type);
    } else {
      selectedTypes.value.splice(index, 1);
    }

    trackProjectFilterClick('type', type, willBeSelected);
  };

  const toggleTechFilter = (tech: string) => {
    const index = selectedTechs.value.indexOf(tech);
    const willBeSelected = index === -1;

    if (willBeSelected) {
      selectedTechs.value.push(tech);
    } else {
      selectedTechs.value.splice(index, 1);
    }

    trackProjectFilterClick('tech', tech, willBeSelected);
  };

  const clearFilters = () => {
    const activeCount = selectedTypes.value.length + selectedTechs.value.length + (searchQuery.value ? 1 : 0);

    if (activeCount > 0) {
      trackProjectClearFilters(activeCount);
    }

    searchQuery.value = "";
    selectedTypes.value = [];
    selectedTechs.value = [];
  };

  const trackSearchDebounced = (query: string, resultCount: number) => {
    if (searchDebounceTimeout.value) {
      clearTimeout(searchDebounceTimeout.value);
    }

    searchDebounceTimeout.value = setTimeout(() => {
      if (query.length >= 2) {
        trackProjectSearch(query, resultCount);
      }
    }, 500);
  };

  const filterProjects = (projectList: Project[]) => {
    return projectList.filter((project) => {
      const matchesSearch =
        searchQuery.value === "" ||
        project.title.toLowerCase().includes(searchQuery.value.toLowerCase()) ||
        project.description
          .toLowerCase()
          .includes(searchQuery.value.toLowerCase()) ||
        project.stack.some((t) =>
          t.toLowerCase().includes(searchQuery.value.toLowerCase())
        );

      const matchesType =
        selectedTypes.value.length === 0 ||
        selectedTypes.value.includes(project.type);

      const matchesTech =
        selectedTechs.value.length === 0 ||
        selectedTechs.value.some((tech) => project.stack.includes(tech));

      return matchesSearch && matchesType && matchesTech;
    });
  };

  const getByCategory = (category: ProjectCategory) => {
    return computed(() =>
      filterProjects(projects.filter((p) => p.category === category))
    );
  };

  const featured = getByCategory("featured");
  const personal = getByCategory("personal");
  const opensource = getByCategory("opensource");
  const client = getByCategory("client");
  const experiments = getByCategory("experiment");

  const allFiltered = computed(() => [
    ...featured.value,
    ...personal.value,
    ...opensource.value,
    ...client.value,
    ...experiments.value,
  ]);

  return {
    projects,
    availableTypes,
    availableTechs,
    searchQuery,
    selectedTypes,
    selectedTechs,
    hasActiveFilters,
    toggleTypeFilter,
    toggleTechFilter,
    clearFilters,
    filterProjects,
    featured,
    personal,
    opensource,
    client,
    experiments,
    allFiltered,
    trackSearchDebounced,
  };
};
