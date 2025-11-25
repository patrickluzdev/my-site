import type { Company, ContactInfo, SocialLink } from "./types";

export const socialLinks: SocialLink[] = [
  {
    name: "GitHub",
    icon: "mdi:github",
    link: "https://github.com/patrickluzdev",
  },
  {
    name: "LinkedIn",
    icon: "mdi:linkedin",
    link: "https://www.linkedin.com/in/patrickluzdev",
  },
  {
    name: "Instagram",
    icon: "mdi:instagram",
    link: "https://www.instagram.com/patrickluz_dev",
  },
];

export const companies: Company[] = [
  {
    name: "Mercado Livre",
    logo: "https://media.licdn.com/dms/image/v2/D4D0BAQE4q-iBP4fZ0g/company-logo_100_100/B4DZUUipIKG8AQ-/0/1739806380950/mercadolivre_com_logo?e=1765411200&v=beta&t=Q9JvaYxLhQN6c8HinPamXNeOJC1g8ge02gTUFQua7Mw",
  },
  {
    name: "Inter",
    logo: "https://media.licdn.com/dms/image/v2/D4D0BAQFTJpEKJy3XsA/company-logo_100_100/B4DZip9S2KHwAQ-/0/1755198075652/inter_logo?e=1765411200&v=beta&t=mKILdyi35e5kYXzgI2npBPHpJ0IpTTj2E9KtUN2krTQ",
  },
  {
    name: "Hurst Capital",
    logo: "https://media.licdn.com/dms/image/v2/D4D0BAQEva4geRlZthA/company-logo_100_100/B4DZc66LWnH4AU-/0/1749040019261/hurst_capital_logo?e=1765411200&v=beta&t=m1zfU_hXn1tRv6WoFSn7YSC3M94zu7fjGvO2JC1l8dE",
  },
  {
    name: "Compasso UOL",
    logo: "https://media.licdn.com/dms/image/v2/D4D0BAQFd2rOF6ddv6w/company-logo_100_100/company-logo_100_100/0/1737984027931/compass_uol_logo?e=1765411200&v=beta&t=Q8RmFoDC7fs-uggMFgdpM0Ra4ks20xKAP812dzB8bIU",
  },
  {
    name: "MB Labs",
    logo: "https://media.licdn.com/dms/image/v2/C4D0BAQHKj6jB-nedqA/company-logo_100_100/company-logo_100_100/0/1654875447501/mblabs_logo?e=1765411200&v=beta&t=nwouNfs0tePf_sfkYpaBTwywLrJZfiEuqkwZFhv5Fzo",
  },
  {
    name: "IXCSoft",
    logo: "https://media.licdn.com/dms/image/v2/D4D0BAQGwyXJkBXf_zg/company-logo_100_100/B4DZkWM6REGkAU-/0/1757014107652/ixcsoft_logo?e=1765411200&v=beta&t=HncjGtSw1XyDy0CCXvs5PaqJFG7z4Nvz-U74H9CSzvg",
  },
];

export const contactInfo: ContactInfo = {
  whatsapp: "5549999487330",
  email: "eu@patrickluz.dev",
  phone: "+55 49 99948-7330",
  location: "Canoas, RS",
  cnpj: "47.383.701/0001-10",
};

export const getWhatsAppLink = (message?: string): string => {
  const defaultMessage =
    "Olá Patrick! Vi seu site e gostaria de conversar sobre um projeto.";
  const encodedMessage = encodeURIComponent(message || defaultMessage);
  return `https://wa.me/${contactInfo.whatsapp}?text=${encodedMessage}`;
};
