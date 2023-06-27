declare module 'html2pdf.js' {
  export default function html2pdf(): {
    set(options: object): {
      from(element: HTMLElement | null): {
        save(): void;
      };
    };
  };
}
