import "./general.css";
import "bootstrap-icons/font/bootstrap-icons.css";
import "@/public/bootstrap.min.css";
import Providers from "@/public/store/provider.js";
import "@mantine/core/styles.css";
import "@mantine/dates/styles.css";
import { MantineProvider } from "@mantine/core";
import "@/public/all.min.css";
import NavBar from "@/Components/NavBar/NavBar";
import LanguajeSelector from "@/Components/LanguageSelector/LanguajeSelector";
import "dayjs/locale/es-mx";

export const metadata = {
  title: "Sabueso-Community",
};

export default function RootLayout({ children }) {
  return (
    <html lang="es">
      <body>
        <Providers>
          <MantineProvider
            settings={{ locale: "es-mx", timezone: "CST" }}
            defaultColorScheme="light"
          >
            <LanguajeSelector />

            <NavBar />
            {children}
          </MantineProvider>
        </Providers>
      </body>
    </html>
  );
}
