import { useEffect, useState } from "react";  
import NavBar from "../../components/admin_site/NavBar"; 
import AlayPagdamayContent from "../../components/admin_site/AlayPagdamayContent";

function AlayPagdamay(){

    return(
        <>
            <NavBar />
            <AlayPagdamayContent />
        </>
    )
}

export default AlayPagdamay;