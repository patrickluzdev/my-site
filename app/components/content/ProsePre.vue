<template>
  <div v-if="isMermaid" class="mermaid-wrapper my-4">
    <div
      class="mermaid-container group relative bg-stone-50 border border-stone-200 rounded-lg p-4"
    >
      <div ref="mermaidRef" class="mermaid"></div>
      <Icon
        name="lucide:expand"
        class="w-10 h-10 p-2 absolute top-3 right-3 z-50 cursor-pointer rounded-lg bg-stone-800 border-2 border-stone-600 text-white shadow-lg hover:bg-stone-900 opacity-0 group-hover:opacity-100 transition-all"
        title="Ver em tela cheia"
        @click="isModalOpen = true"
      />
    </div>

    <Dialog v-model:open="isModalOpen">
      <DialogScrollContent class="max-w-[95vw] h-[90vh] p-6">
        <DialogTitle class="sr-only">Diagrama Mermaid</DialogTitle>
        <div
          class="modal-diagram w-full h-full flex items-center justify-center"
          v-html="svgContent"
        ></div>
      </DialogScrollContent>
    </Dialog>
  </div>
  <pre v-else :class="$attrs.class"><slot /></pre>
</template>

<script setup lang="ts">
import {
  Dialog,
  DialogScrollContent,
  DialogTitle,
} from "@/components/ui/dialog";
import { computed, onMounted, ref, useSlots, type VNode } from "vue";

type VNodeChild = VNode | string | number | boolean | null | undefined;
const props = defineProps<{
  language?: string;
  code?: string;
}>();

const slots = useSlots();
const mermaidRef = ref<HTMLElement | null>(null);
const isModalOpen = ref(false);
const svgContent = ref("");

const isMermaid = computed(() => props.language === "mermaid");

const getMermaidCode = (): string => {
  if (props.code) return props.code;

  const slot = slots.default?.();
  if (!slot) return "";

  const extractText = (node: VNodeChild): string => {
    if (node == null || typeof node === "boolean") return "";
    if (typeof node === "string") return node;
    if (typeof node === "number") return String(node);

    const vnode = node as VNode;
    if (vnode.children) {
      if (typeof vnode.children === "string") return vnode.children;
      if (Array.isArray(vnode.children)) {
        return (vnode.children as VNodeChild[]).map(extractText).join("");
      }
    }
    return "";
  };

  return slot.map(extractText).join("");
};

onMounted(async () => {
  if (isMermaid.value && mermaidRef.value) {
    const mermaid = (await import("mermaid")).default;
    mermaid.initialize({
      startOnLoad: false,
      theme: "neutral",
      securityLevel: "loose",
    });

    const code = getMermaidCode();
    const { svg } = await mermaid.render(
      `mermaid-${Math.random().toString(36).substr(2, 9)}`,
      code
    );
    mermaidRef.value.innerHTML = svg;
    svgContent.value = svg;
  }
});
</script>

<style scoped>
.mermaid-wrapper {
  position: relative;
}

.modal-diagram :deep(svg) {
  width: 100% !important;
  height: auto !important;
  max-height: 100%;
}
</style>
