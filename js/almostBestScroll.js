const rAF=window.requestAnimationFrame || window.webkitRequestAnimationFrame || window.mozRequestAnimationFrame || window.msRequestAnimationFrame || window.oRequestAnimationFrame || function(cb){ window.setTimeout(cb, 1000/60);};

const cancelRaf=window.cancelAnimationFrame || window.webkitCancelAnimationFrame || window.mozCancelAnimationFrame || window.msCancelAnimationFrame || window.oCancelAnimationFrame || clearTimeout;

//构造函数
class AlmostBestScroll{
	constructor(){
		let y=window.scrollY; //垂直方向已滚动的像素值
		this.onScroll=this.onScroll;
		this.onScrollEnd=this.onScrollEnd;
		this.scrollList=[];
		this.scrollEndList=[];
		this.nowWy=y; //当前窗口垂直方向已滚动的像素值
		this.lastY=y;
		this.direction=0 //方向
		this.rafMark=null;
		this.isRafMark=false;
		this.gap=0;
		this.bindEvent();
	};

	onScroll(cb){
		if(typeof cb !== 'function') return;
		this.scrollList.push(cb);
	};

	onScrollEnd(cb){
		if(typeof cb !== 'function') return;
		this.scrollEndList.push(cb);
	};

	scrollEnd(){
		let winInfo={
			y:this.nowWy,
			gap:Math.abs(this.gap),
			dir:this.direction
		};

		for(let i=0,len=this.scrollEndList.length;i<len;i++){
			try{
				this.scrollEndList[i](winInfo);
			}catch(error){
				console.log('error:'+error)
			}
		}
	};

	rafing(){
		this.nowWy=window.scrollY;
		this.gap=this.nowWy-this.lastY;
		//1为向上滑动，-1为向下滑动
		!!this.gap && (this.direction=(((this.gap>=0)|0)-0.5)*2);
		this.lastY=this.nowWy;

		let winInfo={
			y:this.nowWy, //当前的window的scrollY
			gap:Math.abs(this.gap), //上次到这次的距离
			dir:this.direction //滑动方向
		};

		for(let i=0,len=this.scrollList.length;i<len;i++){
			try{
				this.scrollList[i](winInfo);
			}catch(error){
				console.log('error:'+error)
			}
		};

		this.startRaf();
	};

	startRaf(){
		let that=this;
		this.rafMark=rAF(function(){
			that.rafing();
		})
	};

	bindEvent(){
		let that=this;
		window.addEventListener('scroll', function(){
			clearTimeout(that.scrollTimer);

			if(!that.isRafMark){
				that.startRaf();
				that.isRafMark=true;
			};

			that.scrollTimer=setTimeout(function(){
				cancelRaf(that.rafMark);
				that.scrollEnd();
				that.isRafMark=false;
			}, 50)

		}, false)
	};
};

let btScroll=new AlmostBestScroll();
export default btScroll;
