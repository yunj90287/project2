window.addEventListener("load", function(){
	let tabBtn=document.getElementById("tab");
	let exitBtn=document.getElementById("exit");
	let dim=document.querySelector(".dim");
	let mobile=document.getElementById("mobile");
	let bodyFix=document.querySelector("body");

	/* tab, exit, dim */
	tabBtn.addEventListener("click", function(e){
		e.preventDefault();
		mobile.classList.add("active");
		dim.classList.add("active");
		exitBtn.classList.add("active");
		bodyFix.classList.add("fixed");
	});

	exitBtn.addEventListener("click", function(e){
		e.preventDefault();

		mobile.classList.remove("active");
		dim.classList.remove("active");
		bodyFix.classList.remove("fixed");
	});

	dim.addEventListener("click", function(){
		mobile.classList.remove("active");
		dim.classList.remove("active");
		bodyFix.classList.add("fixed");
	});

	/* resize */
	let dw;

	window.addEventListener("resize", function(){
		dw=window.innerWidth;

		if(dw < 720){
			if(mobile.classList.contains("active")){
				bodyFix.classList.add("fixed");
				dim.classList.add("active");
			}
		}
		else {
			mobile.classList.remove("active");
			dim.classList.remove("active");
			bodyFix.classList.remove("fixed");
		}
	});	
	/* video */
	let video=document.getElementById("main_video");
	video.addEventListener("loadeddata", function(){
		video.muted=true;
		video.play();
	});

	video.addEventListener("ended", function(){
		video.play();
	});

	/* slider */

	let mainSwiper=new Swiper(".mainSwiper", {
		loop: true,
		navigation: {
			nextEl: ".mainSwiper .swiper-button-next",
			prevEl: ".mainSwiper .swiper-button-prev"
		},
		/*
		pagination: { // added
			el: ".mainSwiper .swiper-pagination"
		}
		*/
		pagination: { 
			el: ".mainSwiper .swiper-pagination",
			type: "fraction"
		}
	});

	/* scrolltrigger */
	const trigger=new ScrollTrigger.default({ // 선언식
		trigger: {
			once: true,
			toggle: {
				class: {
					in: "active",
					out: "inactive"
				}
			},
			offset: {
				viewport: {
					x: 0,
					y: 0.25
				}
			}
		},
		scroll: {
			callback: offset => scrollFn(offset.y)
		}
	});

	function scrollFn(t){
		console.log(t);
	}

	trigger.add("#page3"); // 호출식

	
	/* header fixed */
	let headerFix=document.querySelector("header");
	let tabFix=document.getElementById("tab");
	let fixed=headerFix.offsetTop;

	window.addEventListener("scroll", function(){
			if(window.pageYOffset > fixed){
				headerFix.classList.add("fixed");
				tabFix.classList.add("active");
			}
			else {
				headerFix.classList.remove("fixed");
				tabFix.classList.remove("active");
			}
	});

	/* footer banner */
	let bannerw=150;
	let sign=footer.firstElementChild; // .signature
	let inner, moveUl, direction, prev, next;

	for(let item of sign.children){
		if(item.className == "inner"){
			inner=item;
			moveUl=inner.firstElementChild;
		}
		else if(item.className == "direction"){
			direction=item;
		}
	}

	// console.log(inner, moveUl, direction);

	for(let item of direction.children){
		if(item.className == "prev"){
			prev=item;
		}
		else if(item.className == "next"){
			next=item;
		}
	}

	function resizeHandler(){
		// console.log(inner.offsetWidth);

		bannerw=inner.offsetWidth/5;

		for(let item of moveUl.children){
			item.style.width=bannerw+"px";
		}
	}

	resizeHandler();

	window.addEventListener("resize", resizeHandler);

	prev.addEventListener("click", function(e){
		e.preventDefault();

		rightMoving(moveUl);
	});
	next.addEventListener("click", function(e){
		e.preventDefault();
		
		leftMoving(moveUl);
	});

	function leftMoving(cont){
		let targetx=0;
		targetx-=bannerw;

		gsap.to(cont, {left: targetx, duration: 0.4, onComplete: function(){
			let firstChild=cont.firstElementChild;
			let clone=firstChild.cloneNode(true);
			cont.removeChild(firstChild);
			cont.appendChild(clone);
			targetx+=bannerw;
			cont.style.left=targetx+"px";
		}});
	}

	function rightMoving(cont){
		let firstChild=cont.firstElementChild;
		let lastChild=cont.lastElementChild;
		let clone=lastChild.cloneNode(true);
		cont.removeChild(lastChild);
		cont.insertBefore(clone, firstChild);

		let targetx=0;
		targetx-=bannerw;
		cont.style.left=targetx+"px";
		targetx+=bannerw;
		gsap.to(cont, {left: targetx, duration: 0.4});
	}
});