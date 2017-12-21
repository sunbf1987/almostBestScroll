
import btScroll from "./almostBestScroll";
//调用方法
btScroll.onScroll(function(){
	console.log('RAF开启')
});

btScroll.onScrollEnd(function(){
	console.log('RAF关闭')
});