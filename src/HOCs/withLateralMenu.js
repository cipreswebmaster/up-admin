/* Components */
import LateralMenu from "components/LateralMenu";

/* Helpers */
import getDisplayName from "helpers/getDisplayName";

function withLateralMenu(Component) {
  function WithLateralMenu(props) {
    return (
      <div
        style={{
          display: "flex",
          maxHeight: "100vh",
          minHeight: "100vh",
          overflow: "hidden",
        }}
      >
        <LateralMenu />
        <Component
          style={{
            width: "90%",
            overflow: "auto",
          }}
          {...props}
        />
      </div>
    );
  }

  WithLateralMenu.displayName = `WithLateralMenu(${getDisplayName(Component)})`;
  return WithLateralMenu;
}
export default withLateralMenu;
