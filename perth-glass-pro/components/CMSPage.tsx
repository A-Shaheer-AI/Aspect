"use client";

import { useEffect } from "react";
import CMS from "decap-cms-app";
import cloudinary from "netlify-cms-media-library-cloudinary";

const CMSPage = () => {
    useEffect(() => {
        // Initialize CMS with explicit config path at root
        // (Since we moved the file to public/config.yml)
        CMS.registerMediaLibrary(cloudinary);
        CMS.init({
            configPath: '/config.yml'
        } as any);
    }, []);

    return (
        <div style={{ display: 'none' }}>
            {/* 
              We return a hidden div because Decap CMS mounts its own UI 
              directly to the document body/root. 
              Keeping this empty prevents React hydration conflicts.
            */}
        </div>
    );
};

export default CMSPage;
