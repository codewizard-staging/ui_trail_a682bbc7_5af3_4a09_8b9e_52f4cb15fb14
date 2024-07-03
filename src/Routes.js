import React from "react";
import { Routes, Route } from "react-router-dom";
import {
LecturerTiles
} from "screens";

const Component = (props) => {

    return (
        <Routes>
            

                        
            
                <Route path="/products/tiles" element={<LecturerTiles {...props} title={'Tiles'} />} />
        </Routes>
    )

};

export default Component;