import React from 'react'
import './Pricing.css'
import pricing from '../images/pricing.jpg'
export default function Pricing() {

    const handlePremiumClick = () => {
        window.location.href = "/CityPulse/PricingPayment";
    };

    return (
        <div className='pricing'>
            <img class="pricing-img" src={pricing} alt='img'/>
            <div className='pricing-text-transform'>
                <label className='h1taglike'>Pricing</label>
                <label className='underh1'>Predictable pricing that scales with you</label>
                <label className='expl'>Free</label>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<label className='underexpl'>For beginners,idle roamers</label>
                <label className='expl'>Standard<span className='underexpl'>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;For professionals,change bringers</span></label>
            </div>
            <div style={{height:"100vh"}} className="pricing-transform">
                <div class="wrapper">
                    <input id="tab-1" name="slider" type="radio" />
                    <input checked id="tab-2" name="slider" type="radio" />
                    <header>
                        <label class="tab-1" for="tab-1">Free</label>
                        <label class="tab-2" for="tab-2">Standard</label>
                        <div class="slider"></div>
                    </header>
                    <div class="card-area">
                        <div class="cards">
                            <div class="row row-1">
                                <div class="price-details">
                                    <span class="price">0</span>
                                    <p>For beginner use</p>
                                </div>
                                <ul class="features">
                                    <li>
                                        
                                        ✔️<span>Unlimited nvme-SSD Storage (5GB) </span>
                                    </li>
                                    <li>
                                        ✔️<span>FREE 50+ Installation Scripts WordPress Supported</span>
                                    </li>
                                    <li>
                                        ✔️<span
                                        >One FREE Domain Registration .com and .np extensions only</span
                                        >
                                    </li>
                                    <li>
                                        ✔️<span>Unlimited Email Accounts &amp; Databases</span>
                                    </li>
                                </ul>
                            </div>
                            <div class="row">
                                <div class="price-details">
                                    <span class="price">499</span>
                                    <p>For professional use</p>
                                </div>
                                <ul class="features">
                                    <li>
                                        ✔️<span>Unlimited GB Premium Bandwidth</span>
                                    </li>
                                    <li>
                                        ✔️<span>FREE 200+ Installation Scripts WordPress Supported</span>
                                    </li>
                                    <li>
                                        ✔️<span
                                        >Five FREE Domain Registration .com and .np extensions only</span>
                                    </li>
                                    <li>
                                        ✔️
                                        <span>Unlimited Email Accounts &amp; Databases</span>
                                    </li>
                                </ul>
                            </div>
                            <div class="row">
                                <div class="price-details">
                                    <span class="price">1999</span>
                                    <p>For team collaboration</p>
                                </div>
                                <ul class="features">
                                    <li>
                                        ✔️<span>200 GB Premium Bandwidth</span>
                                    </li>
                                    <li>
                                        ✔️<span>FREE 100+ Installation Scripts WordPress Supported</span>
                                    </li>
                                    <li>
                                        ✔️<span
                                        >Two FREE Domain Registration .com and .np extensions only</span
                                        >
                                    </li>
                                    <li>


                                        <span>Unlimited Email Accounts &amp; Databases</span>
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </div>
                    <button id="premium" onClick={handlePremiumClick}>Choose plan</button>
                </div>
            </div>
        </div>
    )
}
