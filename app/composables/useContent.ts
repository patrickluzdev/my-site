import {
  metricsAbout,
  metricsHome,
  servicesDetailed,
  servicesSimple,
} from "~/data";

export const useContent = () => {
  return {
    servicesSimple,
    servicesDetailed,
    metricsHome,
    metricsAbout,
  };
};
