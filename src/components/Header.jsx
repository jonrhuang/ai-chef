import chefLogo from "../assets/chef-claude-icon.png"

export default function Header() {
    return (
        <header>
            <img src={chefLogo}/>
            <h1>A.I. Chef</h1>
        </header>
    )
}