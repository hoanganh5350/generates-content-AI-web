import Profile from "../pages/ProfileView/Profile";
import Services from "../pages/ServicesView/Services";
import { KEY_SCREENS } from "./enums";

export const MenuLayout = [
    {
        key: KEY_SCREENS.SERVICES,
        icon: 'services',
        label: 'Services'
    },
    {
        key: KEY_SCREENS.PROFILE,
        icon: 'profile',
        label: 'Profile'
    }
]

export const ContentView = [
    {
        key: KEY_SCREENS.SERVICES,
        screen: <Services />
    },
    {
        key: KEY_SCREENS.PROFILE,
        screen: <Profile />
    }
]