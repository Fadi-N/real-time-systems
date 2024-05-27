import {NavLink} from 'react-router-dom';

const Navbar = () => {
    const linkClasses = ({isActive}) => isActive ? "text-orange-500" : "hover:text-gray-400";
    const navItems = [
        {to: "/modbuscrc", label: "Modbus CRC"},
        {to: "/cancrc", label: "CAN CRC"},
        {to: "/ieee754", label: "IEEE 754"}
    ];

    return (
        <nav className="py-6 px-4 lg:py-4 lg:px-16 shadow">
            <div className="flex justify-between items-center">
                <div className="hidden font-mono font-semibold lg:text-lg lg:block">
                    Real Time Systems
                </div>
                <div className="font-mono font-semibold text-2xl lg:hidden">
                    RTS
                </div>
                <ul className="flex justify-center space-x-2 lg:space-x-6 lg:p-4">
                    {navItems.map(({to, label}) => (
                        <li key={to} className="border-e-2 pe-2 lg:pe-6">
                            <NavLink to={to} className={linkClasses}>
                                {label}
                            </NavLink>
                        </li>
                    ))}
                </ul>
            </div>
        </nav>
    );
}

export default Navbar;
