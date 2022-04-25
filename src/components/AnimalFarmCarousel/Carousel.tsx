import React from 'react';
import Slider from "react-slick";
import style from './AnimalFarmCarouse.module.scss';


function AnimalFarmCarousel() {

    const settings = {
        className: "slider variable-width",
        infinite: true,
        speed: 500,
        slidesToShow: 4,
        slidesToScroll: 1,
        initialSlide: 0,
        responsive: [
            {
            breakpoint: 1350,
            settings: {
                slidesToShow: 3,
                slidesToScroll: 1,
                infinite: true,
            }
            },
            {
            breakpoint: 1050,
            settings: {
                slidesToShow: 2,
                slidesToScroll: 1,
                initialSlide: 2,
                infinite: true,
            }
            },
            {
            breakpoint: 600,
            settings: {
                slidesToShow: 1,
                slidesToScroll: 1,
                infinite: true,
            }
            }
        ]
      };


     
return (
    <div>
        <div className={style.categories}>
            <h2 className={style.category__header} >Animal Farm Features</h2>
            <Slider {...settings}>
                <div className={style.card}>
                    <h3>High yield</h3>
                    <div className={style.card__info}>
                        Accumulate your share of the network by farming PIGS governance tokens, while leveraging your
                        collateralized assets through our substrata lending protocol to collect a high yield BUSD
                        dividend without ever selling your underlying assets.
                    </div>
                </div>

                <div className={style.card}>
                    <h3>Fee Distribution</h3>
                    <div className={style.card__info}>
                        Deposit fees and taxes, go to PIGS stakers as  BUSD rewards.
                    </div>
                </div>

                <div className={style.card}>
                    <h3>Sustainability</h3>
                    <div className={style.card__info}>
                        All taxes associated with core tokens go towards rewarding platform participants and generating BUSD
                        rewards for stakers!!.
                    </div>
                </div>

                <div className={style.card}>
                    <h3>Dynamic Emission</h3>
                    <div className={style.card__info}>
                        Dynamic emmission rates based on current demand, allowing for price appreciation of DOGS and PIGS in all
                        market conditions!!
                    </div>
                </div>

                <div className={style.card}>
                    <h3>Governance</h3>
                    <div className={style.card__info}>
                        Full governance protocol giving PIGS stakers a vote future opportunities!!
                    </div>
                </div>

                <div className={style.card}>
                    <h3>Lending</h3>
                    <div className={style.card__info}>
                        Collateral staked on the platform is rehypothecated to Pancakeswap's lending protocol
                        to earn additional yield, which goes towards buying DOGS and PIGS directly from the market and sending
                        them to a burn address.
                    </div>
                </div>

                <div className={style.card}>
                    <h3>Title</h3>
                    <div className={style.card__info}>
                        Millions in BUSD rewards already in the vault ready to pay out the high yield BUSD dividend and
                        buy the DOGS, PIGS directly off the market removing them from circulation
                    </div>
                </div>

                <div className={style.card}>
                    <h3>Integrity</h3>
                    <div className={style.card__info}>
                        From the Developers of DRIP, the fastest growing and highest ranked Defi protocol on BSC!!
                    </div>
                </div>

            </Slider>
        </div>
    </div>
 )
}

export default AnimalFarmCarousel;