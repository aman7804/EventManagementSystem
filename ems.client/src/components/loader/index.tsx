  import { CircularProgress } from "@mui/material";
import { connect } from "react-redux";
  import { loaderStateSelector } from "store/loader/selector";
import { RootState } from "store/root/root.reducer";
  import store from "store/root/root.store";

  const loaderState = loaderStateSelector(store.getState())
  console.log("loaderState: ",loaderState)

  export interface ILoaderProps {
    className?: string;
    color?: "primary" | "secondary" | "inherit";
    size?: number;
    thickness?: number;
    isLoading: boolean;
  }

  const Loader: React.FC<ILoaderProps> = ({
    className = "",
    color = "primary",
    thickness = 2,
    size = 50,
    isLoading
  }) => {
    console.log("isLoadig:" ,isLoading)
    return (
      <div id="loaderForAPICall" className={className} style={{ display: isLoading ? 'block' : 'none' }}>
        <div className={`preloader ${className} fullscreen`}>
          <CircularProgress
            className="main-loader"
            color={color}
            thickness={thickness}
            size={size}
          />
        </div>
      </div>
    );
  };

  const mapStateToProps = (state: RootState) => ({
    isLoading: loaderStateSelector(state)
  });
  
  export default connect(mapStateToProps)(Loader);