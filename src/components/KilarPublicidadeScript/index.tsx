import React from 'react';
import { Helmet } from 'react-helmet';

export default function KilarPublicidadeScript() {
  return (
    <>
      <Helmet>
        <script>{`(function(w,d,s,l,i){w[l] = w[l] || [];w[l].push({'gtm.start':
            new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
            j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
            'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
            })(window,document,'script','dataLayer','GTM-5KQ2KM5');`}</script>
        <script async src="https://www.googletagmanager.com/gtag/js?id=AW-11161658954"></script>

        <script>{`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());

            gtag('config', 'AW-11161658954');`}
        </script>

        <script>{`
            gtag('event', 'conversion', {'send_to': 'AW-11161658954/pDpjCLb66qEYEMrMpcop'});`}
        </script>

        <script>{`
            function gtag_report_conversion(url) {
              var callback = function () {
                if (typeof(url) != 'undefined') {
              window.location = url;
                }
              };
            gtag('event', 'conversion', {
              'send_to': 'AW-11161658954/OHIcCLn66qEYEMrMpcop',
            'event_callback': callback
              });
            return false;
            }`}
        </script>

        <script>{`
            function gtag_report_conversion(url) {
              var callback = function () {
                if (typeof(url) != 'undefined') {
              window.location = url;
                }
              };
            gtag('event', 'conversion', {
              'send_to': 'AW-11161658954/wlJfCLP66qEYEMrMpcop',
            'event_callback': callback
              });
            return false;
            }`}
        </script>
      </Helmet>
      <noscript><iframe src="https://www.googletagmanager.com/ns.html?id=GTM-5KQ2KM5"
        height="0" width="0" style="display:none;visibility:hidden"></iframe></noscript>
    </>
  );
}
