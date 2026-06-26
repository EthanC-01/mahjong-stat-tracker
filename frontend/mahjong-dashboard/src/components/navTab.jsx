import './navTab.css'

export default function NavTabs({tabs, currentTab, onTabChange, style}) {
  return(
    <div className="nav" style={style}>
      {tabs.map((tab) => (
        <button key={tab} className={currentTab === tab ? "nav-active" : "nav-tab"} onClick={() => onTabChange(tab)}>{tab}</button>
      ))}
    </div>
  );
}