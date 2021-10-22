// navbar :
document.getElementById('openMenu').addEventListener('click', toggleMenu)
document.getElementById('closeMenu').addEventListener('click', toggleMenu)
var isClose = true;
function toggleMenu(e) {
    e.preventDefault();
    if(isClose) {
        document.body.classList += "navbar-menu-open"
    } else {
        document.body.classList.remove("navbar-menu-open")
    }
    isClose = !isClose;
}



// Skeleton slide vertical and horizontal: 

function horizontalify() {
    const sections = document.getElementsByTagName("section");
    let index = 0;
    let top = 0;
  
    for (const section of sections) {
      const currentIndex = index;
      const currentTop = top;
  
      section.style.width = section.children.length * 100 + "vw";
      section.style.height = "100vh";
      section.style.position = "absolute";
      section.style.left = 0;
      section.style.top = currentTop + "px";
  
      makeHeightHolder(section);
      watchHeightHolder(section, {
        index: currentIndex,
        top: currentTop
      });
  
      index++;
      top += section.nextSibling.clientHeight;
    }
  }
  
  function makeHeightHolder(node) {
    const heightHolder = document.createElement("div");
    heightHolder.style.height =
      (node.clientWidth / node.children.length) * (node.children.length - 1) +
      node.clientHeight +
      "px";
  
    if (node.nextSibling) {
      node.parentNode.insertBefore(heightHolder, node.nextSibling);
    } else {
      node.parentNode.append(heightHolder);
    }
  }
  
  function watchHeightHolder(node, props) {
    const handleScroll = makeScrollHandler(node, props);
  
    window.addEventListener("scroll", handleScroll);
  }
  
  function makeScrollHandler(node, props) {
    const scrollableWidth = node.clientWidth - window.innerWidth;
    let atTop = true;
    let atBottom = false;
  
    return function handleScroll(e) {
      const scrollTop = document.scrollingElement.scrollTop;
      const left = scrollTop - props.top;
      if (!atTop && scrollTop < props.top) {
        node.style.position = "absolute";
        node.style.left = 0;
        node.style.top = props.top + "px";
        atTop = true;
      } else if (!atBottom && left > scrollableWidth) {
        node.style.position = "absolute";
        node.style.left = -1 * scrollableWidth + "px";
        node.style.top = scrollableWidth + props.top + "px";
        atBottom = true;
      } else if (scrollTop > props.top && left <= scrollableWidth) {
        node.style.position = "fixed";
        node.style.left = -1 * left + "px";
        node.style.top = 0;
        atTop = false;
        atBottom = false;
      }
    };
  }
  

addEventListener("load", horizontalify);