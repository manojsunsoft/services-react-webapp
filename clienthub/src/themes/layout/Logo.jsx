import { useState, useEffect } from 'react';

//import { useTheme } from '../../hooks/UseTheme';

export default function Logo() {
    // const { theme } = useTheme();
    // const [selectedTheme, setSelectedTheme] = useState(theme);
    // const [ Logo, setLogo ] = useState(theme.logoUrl);
    // useEffect(() => {
    //     setSelectedTheme(selectedTheme);
    //     setLogo(selectedTheme.logoUrl)
    // }, [selectedTheme])

    return (
        <a href="#/" className="navbar-brand brand-logo"><img alt="" className="img-fluid logo-size" src={""} /></a>
    )
}
