import React, { useState, useEffect, useRef } from 'react';

import * as moment from 'moment';
import 'moment/locale/ru';

import defaultAvatar from '../../assets/svg/default.avatar.svg';

function NewsItem(props) {

    const { avatar, first_name, last_name, updated_at } = props.item.user;
    const { id, parts, title } = props.item;

    const [opened, setOpened] = useState(false);
    const [openable, setOpenable] = useState(false);
    const elementRef = useRef(null);

    useEffect(() => {
        const height = elementRef.current.offsetHeight;
        if (height >= 280) {
            setOpenable(true);
        }
    }, [elementRef])

    function renderPart(part) {

        const { id, type, content, img_link } = part;

        const url = 'https://stage.api.beinsport.ru/storage/';

        switch(type) {
            case 'paragraph':
                return(<div key={`prt_${part.id}`} className="news-item-part">
                        <div className="news-item-part__paragraph">
                            { content }
                        </div>
                    </div>);
            case 'image':
                return(<div key={`prt_${part.id}`} className="news-item-part">
                        <div className="news-item-part__image">
                            <img src={url + img_link} alt="news image"/>
                        </div>
                    </div>);
            case 'video':
                return(<div key={`prt_${part.id}`} className="news-item-part">
                        <div className="news-item-part__video">
                            <video>
                                <source src={content} />
                            </video>
                        </div>
                    </div>);
            case 'subtitle':
                return(<div key={`prt_${part.id}`} className="news-item-part">
                        <div className="news-item-part__subtitle">
                            { content }
                        </div>
                    </div>)
            default:
                return null
        }
    }

    return(<article key={`nw_${id}`} className="news-item">
            <div className="news-item-top">
                {
                    avatar &&
                    <div className="news-item-top__image">
                        <img src={avatar} alt="user avatar" />
                    </div>
                }
                {
                    !avatar &&
                    <div className="news-item-top__image-null">
                        <div className="wrapper">
                            <img src={defaultAvatar} alt="user avatar" />
                        </div>
                    </div>
                }
                <div className="news-item-top__info">
                    <span>
                        { first_name } { last_name }
                    </span>
                    <span>
                        { moment(updated_at).format('D MMMM в HH:mm') }
                    </span>
                </div>
            </div>
            <div className="news-item__title">
                { title }
            </div>
            <div className={'news-item__content' + (opened ? ' opened' : '') + (openable && !opened ? ' shadow' : '')} ref={elementRef}>
                {
                    parts && parts.map(part => {
                        return(renderPart(part))
                    })
                }
            </div>
            {
                openable && !opened &&
                <div className="news-item__button">
                    <button onClick={() => setOpened(true)}>
                        ПОКАЗАТЬ ПОЛНОСТЬЮ
                    </button>
                </div>
            }
            
        </article>);
}

export default NewsItem;
