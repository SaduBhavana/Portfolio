import React, { useState } from "react";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Box from "@mui/material/Box";
import HomePage from "./HomePage";
const Home = () => {
    const [value,setValue]= useState(0);
    const handleChange = (event,newValue) => {
        setValue(newValue);
    };
    return (
        <Box sx={{ position: 'relative', minHeight: '100%', pt: 0 }}>
            <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mb: 3, gap: 2, flexWrap: 'wrap', width: '100%', mt: 0 }}>
                <Box component="span" sx={{ fontSize: '2rem', fontWeight: 700, color: '#eef5ff', whiteSpace: 'nowrap', ml: 0 }}>
                    Port
                    <Box component="span" sx={{ color: '#3b82f6' }}>folio</Box>
                </Box>
                <Box sx={{ display: 'flex', flex: 1, justifyContent: 'flex-end', minWidth: 0 }}>
                    <Box sx={{ bgcolor: 'rgba(0, 0, 0, 0.35)', borderRadius: 2, px: 1, width: '100%', maxWidth: 'min(760px, 100%)' }}>
                        <Tabs value={value} onChange={handleChange} sx={{ justifyContent: 'flex-end' }}>
                            <Tab label="Home" sx={{ color: 'white' }} />
                            <Tab label="About" sx={{ color: 'white' }} />
                            <Tab label="Skills" sx={{ color: 'white' }} />
                            <Tab label="Projects" sx={{ color: 'white' }} />
                            <Tab label="Contact" sx={{ color: 'white' }} />
                        </Tabs>
                    </Box>
                </Box>
            </Box>
            <Box sx={{ pt: 3 }}>
                {value === 0 && <HomePage />}
            {value === 1 && <div>About Content</div>}
                {value === 2 && <div>Skills Content</div>}
                {value === 3 && <div>Projects Content</div>}
                {value === 4 && <div>Contact Content</div>}
            </Box>
        </Box>
    );
}
export default Home;