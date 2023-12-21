import { useState } from "react";
import placeholder from "../../public/placeholder.svg";

export const LoadingImage = ({imageUrl}: {imageUrl : string}) => {
    const [imageLoaded, setImageLoaded] = useState(false);

    return (
        <>
            {!imageLoaded && (
                <img src={placeholder} alt="" />
            )}
            <img
                src={imageUrl}
                alt=""
                style={{ display: imageLoaded ? "block" : "none" }}
                className="rounded-md m-2"
                onLoad={() => setImageLoaded(true)}
            />
        </>
    );
}