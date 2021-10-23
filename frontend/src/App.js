import SwaggerUI from "swagger-ui-react";
import "swagger-ui-react/swagger-ui.css";

function App() {
  return (
    <SwaggerUI url="https://raw.githubusercontent.com/kev-inc/cloudflare-cms/main/backend/swagger.json" />
  );
}

export default App;
