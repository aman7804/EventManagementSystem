import { CircularProgress } from "@mui/material";

export interface ILoaderProps {
  className?: string;
  color?: "primary" | "secondary" | "inherit";
  size?: number;
  thickness?: number;
}

const Loader: React.FC<ILoaderProps> = ({
  className = "",
  color = "primary",
  thickness = 2,
  size = 50,
}) => {
  return (
    <div id="loaderForAPICall" className={className}>
      {/* <div className={`preloader ${className} fullscreen`}> */}
        <CircularProgress
          className="main-loader"
          color={color}
          thickness={thickness}
          size={size}
        />
      {/* </div> */}
    </div>
  );
};

export default Loader;