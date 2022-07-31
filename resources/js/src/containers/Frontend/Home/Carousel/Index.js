import React, { useState } from 'react';
import { Carousel, CarouselItem } from 'reactstrap';

import './Carousel.scss';

export default ({ children, items }) => {
    const [activeIndex, setActiveIndex] = useState(0);
    const [animating, setAnimating] = useState(false);

    const setText = index => {
        const check = index % 2;

        const bannerContainerElt = $('.banner__container');

        const bannerElt = $('.banner__text');
        const selectedContentElt = bannerElt.find(['.left', '.right'][check]).find('.content');
        const otherContentElt = bannerElt.find(['.right', '.left'][check]).find('.content');

        bannerContainerElt.animate({ backgroundPositionX: ['0%', '100%'][check] }, 250);
        
        otherContentElt.hide(250);
        selectedContentElt.hide(250).show(250).stop();

        selectedContentElt.find('.super').text(items[index].head);
        selectedContentElt.find('.title .top').text(items[index].title.top);
        selectedContentElt.find('.title .bottom').text(items[index].title.bottom);
        selectedContentElt.find('.description').text(items[index].description);
    }

    const next = () => {
        if (animating) return;
        const nextIndex = activeIndex === items.length - 1 ? 0 : activeIndex + 1;
        setActiveIndex(nextIndex);
        setText(nextIndex);
    }

    const previous = () => {
        if (animating) return;
        const nextIndex = activeIndex === 0 ? items.length - 1 : activeIndex - 1;
        setActiveIndex(nextIndex);
        setText(nextIndex);
    }

    const slides = items.map(item => <CarouselItem onExiting={() => setAnimating(true)} onExited={() => setAnimating(false)} key={item.src} className="h-100">
        <div className="h-100 bg-img" style={{ backgroundImage: `url("${item.src}")` }} />
    </CarouselItem>);

    return <Carousel id="banner-carousel" activeIndex={activeIndex} next={next} previous={previous} ride='carousel' className="h-100 carousel-fade Carousel">
        {slides}

        {children}
    </Carousel>;
}

