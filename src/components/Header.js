import logo from "../image/Vector.svg"


function Header (){
  return (
    <header className="header">
    <img src={logo} alt="logo around the us" className="header__logo" />
  </header>
  )
}
export default Header