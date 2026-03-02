import "./App.css";
import { RPConfig } from "@react-pdf-kit/viewer";
import { AppPDFViewer } from "./components/AppPDFViewer";

function App() {
  return (
    <RPConfig licenseKey="" workerUrl={'/pdf.worker.min.mjs'}>
      <div className="container">
        <h1>React PDF Starter Toolkit in React.js, JavaScript and Webpack</h1>
        <br />
        <h2>Default Toolbar</h2>
        <AppPDFViewer />
        <h2>Without Toolbar</h2>
        <AppPDFViewer
          showToolbar={false}
          defaultLayoutProps={{
            style: { width: "100%", height: "550px" },
          }}
        />
        <h2>Mobile</h2>
        <AppPDFViewer
          defaultLayoutProps={{
            style: { width: "500px" },
          }}
        />
      </div>
    </RPConfig>
  );
}

export default App;
