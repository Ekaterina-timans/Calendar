import React, { useState, useEffect } from "react";
import styles from "./Calendar.module.css";

export default function Calendar() {
    const 
        [date, setDate] = useState(""),
        [calendar, setCalendar] = useState([]),
        [selectedDate, setSelectedDate] = useState(null);

    useEffect(() => {
            // Обновлять selectedDate при изменении значения в поле ввода
        if (date) {
            const [day, month, year] = date.split(".");
            setSelectedDate(new Date(year, month - 1, day).getDate());
        }
    }, [date]);
    
    const handleSubmit = (e) => {
        e.preventDefault();
        const [day, month, year] = date.split(".");
        const daysInMonth = new Date(year, month, 0).getDate();
        const startingDay = new Date(year, month - 1, 1).getDay();
        const calendarArray = [];
        
        for (let i = 0; i < startingDay; i++) {
            calendarArray.push("");
        }
        
        for (let i = 1; i <= daysInMonth; i++) {
            calendarArray.push(i);
        }
        
        setCalendar(calendarArray);
    };
        
    const renderCalendar = () => {
        if (calendar.length === 0) {
            return null;
        }
        
        const weeks = Math.ceil(calendar.length / 7);
        const rows = [];
        let startIndex = 0;
        let endIndex = 7;
        
        for (let i = 0; i < weeks; i++) {
            rows.push(calendar.slice(startIndex, endIndex));
            startIndex += 7;
            endIndex += 7;
        }
        
        const dayNames = ["Вс", "Пн", "Вт", "Ср", "Чт", "Пт", "Сб"];

        return (
            <table className={styles.tbl}>
                <thead>
                    <tr className={styles.header}>
                        {dayNames.map((dayName, index) => (
                            <th key={index}>{dayName}</th>
                        ))}
                    </tr>
                </thead>
                <tbody>
                    {rows.map((week, index) => (
                        <tr key={index}>
                            {week.map((day, dayIndex)  => {
                                const isSelected = day === selectedDate;
                                return (
                                    <td key={dayIndex} className={`${styles.td} ${isSelected ? styles.selected : ""}`}>
                                        {day !== "" ? day : ""}
                                    </td>
                                );
                            })}
                        </tr>
                    ))}
                </tbody>
            </table>
        );
    };
    return (
        <div>
            <form onSubmit={handleSubmit}>
                <label htmlFor="date">Введите дату (ДД.ММ.ГГГГ): </label>
                <input className={styles.date} type="text" id="date" value={date} onChange={(e) => setDate(e.target.value)}/>
                <button type="submit">Получить календарь</button>
            </form>
            
            <div>{renderCalendar()}</div>
        </div>
    );
};