import type { Project, ProjectCategory, ProjectType } from "~/data";
import { projects, projectTypes } from "~/data";

export const useProjects = () => {
  const searchQuery = ref("");
  const selectedTypes = ref<ProjectType[]>([]);
  const selectedTechs = ref<string[]>([]);

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
    if (index === -1) {
      selectedTypes.value.push(type);
    } else {
      selectedTypes.value.splice(index, 1);
    }
  };

  const toggleTechFilter = (tech: string) => {
    const index = selectedTechs.value.indexOf(tech);
    if (index === -1) {
      selectedTechs.value.push(tech);
    } else {
      selectedTechs.value.splice(index, 1);
    }
  };

  const clearFilters = () => {
    searchQuery.value = "";
    selectedTypes.value = [];
    selectedTechs.value = [];
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
  };
};
