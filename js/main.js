
import btScroll from "./almostBestScroll";

//调用方法
btScroll.onScroll(function(){
	let greet=document.createElement('div');
	greet.textContent="RAF开启";
	document.getElementById('root').appendChild(greet);
});

btScroll.onScrollEnd(function(){
	let greet=document.createElement('div');
	greet.textContent="RAF关闭";
	document.getElementById('root').appendChild(greet);
});