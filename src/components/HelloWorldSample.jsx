import { createElement } from "react";
import { useEffect, useState } from "react";
import CountryInfo from "./CountryInfo";
import React from "react";

export function HelloWorldSample(props) {
    const [hours, setHours] = useState("");
    const [minutes, setMinutes] = useState("");
    const [second, setSeconds] = useState("");
    const [fulltime, setFulTime] = useState("");
    const [ampm, setampm] = useState("");
    let regionDS = "";

    if (props?.regionCity?.status === "available") {
        runclock(props.regionCity.displayValue);
    } else {
        runclock(props.Cuntry);
    }

    function runclock(tz) {
        setInterval(() => {
            const options = { timeZone: tz, hour12: false, dateStyle: "full", timeStyle: "full" };
            if (tz !== "") {
                const now = new Date().toLocaleString("en-US", options);
                const [, timePart] = now.split("at ");
                const [time] = timePart.split(" ");
                const [hours, minutes, seconds] = time.split(":");
                const fullttime = now.split(" ")[0] + " " + time;
                console.log(now.split(" ")[0]);
                setFulTime(fullttime);
                setHours(hours);
                setMinutes(minutes);
                setSeconds(seconds);
                hours >= 12 ? setampm("PM") : setampm("AM");
            }
        }, 1000);
    }


    const retriveCountryFlag = countryname => {
        const str = countryname;
        const result = typeof str === "string" ? str.toLowerCase() : "";
        const country = CountryInfo.find(obj => obj.name.toLowerCase() === result.toLowerCase());
        return country?.code.toLowerCase();
    };
    const countrycodeis = retriveCountryFlag(props.Showflag);
    const borderradiusvalue = props.borderradius + "%";

    return (
        <div className="clock-container"
        style={{width: props.widthofclock }}
        >
            <div
                className={"clock"}
                style={{ background: props.clockbg, borderRadius: borderradiusvalue }}
            >
                <div
                    className={"hand hour_hand"}
                    style={{
                        transform: `rotateZ(${hours * 30}deg)`,
                        background: props.hourHand
                    }}
                />
                <div
                    className={"hand min_hand"}
                    style={{
                        transform: `rotateZ(${minutes * 6}deg)`,
                        background: props.minutHand
                    }}
                />
                <div
                    className="hand sec_hand"
                    style={{
                        transform: `rotateZ(${second * 6}deg)`,
                        background: props.secondHand
                    }}
                />

                <div>
                    {props.Showflaginside ? (
                        <div className="flagCountryInside">
                            <img src={`https://flagcdn.com/w40/${countrycodeis}.png`} />
                        </div>
                    ) : (
                        ""
                    )}
                </div>

                <div className="Show_AM_PM" style={{ opacity: props.showAM ? "1" : "0", color: props.numbervalue }}>
                    {ampm}
                </div>
                <span className="twelve" style={{ color: props.numbervalue }}>
                    12
                </span>
                <span className="one" style={{ color: props.numbervalue }}>
                    1
                </span>
                <span className="two" style={{ color: props.numbervalue }}>
                    2
                </span>
                <span className="three" style={{ color: props.numbervalue }}>
                    3
                </span>
                <span className="four" style={{ color: props.numbervalue }}>
                    4
                </span>
                <span className="five" style={{ color: props.numbervalue }}>
                    5
                </span>
                <span className="six" style={{ color: props.numbervalue }}>
                    6
                </span>
                <span className="seven" style={{ color: props.numbervalue }}>
                    7
                </span>
                <span className="eight" style={{ color: props.numbervalue }}>
                    8
                </span>
                <span className="nine" style={{ color: props.numbervalue }}>
                    9
                </span>
                <span className="ten" style={{ color: props.numbervalue }}>
                    10
                </span>
                <span className="eleven" style={{ color: props.numbervalue }}>
                    11
                </span>
            </div>

            <div className="belowClock">
                {props.showTime ? fulltime : ""}
                {props.Showflag && !props.Showflaginside ? 
                        <img src={`https://flagcdn.com/w40/${countrycodeis}.png`} />
                 : 
                    ""
                }
            </div>
        </div>
    );
}
