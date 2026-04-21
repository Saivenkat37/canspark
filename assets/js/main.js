// Custom JS
console.log("Website Loaded Successfully!");

// small helper: add .scrolled class to header on scroll
window.addEventListener('scroll', function(){
	const header = document.querySelector('.site-header');
	if(!header) return;
	if(window.scrollY > 20) header.classList.add('scrolled'); else header.classList.remove('scrolled');
});

// Drag-to-scroll for horizontal intel-scroll containers
function enableDragToScroll(){
	const containers = document.querySelectorAll('.intel-scroll');
	containers.forEach(container => {
		let isDown = false;
		let startX;
		let scrollLeft;

		container.addEventListener('pointerdown', (e) => {
			isDown = true;
			container.setPointerCapture(e.pointerId);
			startX = e.pageX - container.offsetLeft;
			scrollLeft = container.scrollLeft;
			container.classList.add('dragging');
			e.preventDefault();
		});

		container.addEventListener('pointermove', (e) => {
			if(!isDown) return;
			const x = e.pageX - container.offsetLeft;
			const walk = (x - startX) * 1; // scroll-fast multiplier
			container.scrollLeft = scrollLeft - walk;
		});

		const stop = (e) => {
			if(!isDown) return;
			isDown = false;
			try{ container.releasePointerCapture && container.releasePointerCapture(e && e.pointerId); }catch(err){}
			container.classList.remove('dragging');
		};

		container.addEventListener('pointerup', stop);
		container.addEventListener('pointerleave', stop);
		container.addEventListener('pointercancel', stop);
	});
}

// initialize after DOM ready
if(document.readyState === 'loading'){
	document.addEventListener('DOMContentLoaded', enableDragToScroll);
} else {
	enableDragToScroll();
}