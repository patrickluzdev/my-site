import {
  metricsAbout,
  metricsHome,
  serviceCategories,
} from "~/data";

export const useContent = () => {
  return {
    serviceCategories,
    metricsHome,
    metricsAbout,
  };
};
