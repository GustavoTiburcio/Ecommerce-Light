import { IInfoBar } from '../components/InfoBar';
import { IConfigs, IFooter } from '../context/Context';

export const configsMock: IConfigs[] = [
  {
    id: 1,
    config: 'imageOrientation',
    value: 'landscape',
    description: 'Define product image orientation: landscape/portrait',
  },
  {
    id: 2,
    config: 'maxInstallments',
    value: '1',
    description: 'Define maximum number of installments',
  },
  {
    id: 3,
    config: 'minInstallmentPrice',
    value: '0',
    description: 'Define minimum price of each installment',
  },
  {
    id: 4,
    config: 'needAuthToSeePrices',
    value: '0',
    description: 'Define if users need be logged in to see product prices',
  },
  {
    id: 5,
    config: 'showSkuInCard',
    value: '0',
    description: 'Define to set visible sku on product card',
  },
  {
    id: 6,
    config: 'instagram',
    value: '',
    description: 'Instagram page link',
  },
  {
    id: 7,
    config: 'facebook',
    value: '',
    description: 'Facebook page link',
  },
  {
    id: 8,
    config: 'youtube',
    value: '',
    description: 'Youtube page link',
  },
  {
    id: 9,
    config: 'twitter',
    value: '',
    description: 'Twitter page link',
  },
  {
    id: 10,
    config: 'whatsapp',
    value: '5544998953461',
    description: 'Whatsapp number',
  },
  {
    id: 11,
    config: 'logo',
    value: 'https://imagizer.imageshack.com/v2/220x200q90/922/1WE3zy.png',
    description: 'Logo link',
  }
];

export const infoBarMock: IInfoBar[] = [
  {
    id: 1,
    text: 'Install your purchases up to 12 times on your credit card',
    iconName: 'FaMoneyCheckAlt',
    ord: 2
  },
  {
    id: 2,
    text: 'Delivery service',
    iconName: 'FaTruck',
    ord: 4
  },
  {
    id: 3,
    text: 'Online service',
    iconName: 'FaCheckCircle',
    ord: 3
  },
  {
    id: 4,
    text: 'Responsibility and dedication to our products and services',
    iconName: 'FaHeart',
    ord: 1
  }
];

export const footerMock: IFooter[] = [
  {
    id: 1,
    title: 'Customer Service',
    ord: 1,
    footerItens: [
      {
        id: 1,
        text: 'Open Monday to Friday, 8am - 6pm',
        ord: 1,
        footerSubItens: []
      },
      {
        id: 2,
        text: 'Fon: +55 (44) 99895-3461',
        ord: 2,
        footerSubItens: []
      },
      {
        id: 3,
        text: 'Cel: +55 (44) 99895-3461',
        ord: 3,
        footerSubItens: []
      },
      {
        id: 12,
        text: 'gustavotiburcio23@gmail.com',
        ord: 4,
        footerSubItens: []
      }
    ]
  },
  {
    id: 2,
    title: 'Help',
    ord: 2,
    footerItens: [
      {
        id: 4,
        text: 'FAQ',
        ord: 1,
        footerSubItens: [
          {
            id: 1,
            question: 'How do i cancel my purchase?',
            answer: 'In case of cancellation of the purchase made, please contact us and inform the reason for the cancellation. We are available through the following contacts Phone +55 (44) 99895-3461 and WhatsApp +55 (44) 99895-3461 Monday to Friday, 8am - 6pm, except holidays. If you prefer via email: gustavotiburcio23@gmail.com',
            ord: 1
          }
        ]
      },
      {
        id: 5,
        text: 'Shipping',
        ord: 2,
        footerSubItens: []
      },
      {
        id: 6,
        text: 'Payment',
        ord: 3,
        footerSubItens: []
      }
    ]
  },
  {
    id: 3,
    title: 'Institutional',
    ord: 3,
    footerItens: [
      {
        id: 7,
        text: 'About us',
        ord: 1,
        footerSubItens: []
      },
      {
        id: 8,
        text: 'Regulations',
        ord: 2,
        footerSubItens: []
      },
      {
        id: 9,
        text: 'Exchanges and refunds',
        ord: 3,
        footerSubItens: []
      },
      {
        id: 10,
        text: 'Privacy Policy',
        ord: 4,
        footerSubItens: []
      },
      {
        id: 11,
        text: 'Our stores',
        ord: 5,
        footerSubItens: []
      }
    ]
  }
];
