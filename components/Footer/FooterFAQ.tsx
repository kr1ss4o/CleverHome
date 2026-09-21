"use client";

import { useRef } from "react";

const questions = [
    {
        question: "What type of devices are compatible?",
        answer: "CleverHome supports four types of devices: radiators, lights, thermostats, and fans.",
    },
    {
        question: "How many devices can I connect?",
        answer: "There is no limit to the number of devices you can connect to your account.",
    },
];

export default function FooterFAQ() {
    const dialog = useRef<HTMLDialogElement>(null);

    return (
        <>
            <ul className="footerQuestions">
                {questions.map(({ question }) => (
                    <li key={question}>
                        <button
                            type="button"
                            className="footerQuestionButton"
                            aria-haspopup="dialog"
                            onClick={() => dialog.current?.showModal()}
                        >
                            {question}
                        </button>
                    </li>
                ))}
            </ul>
            <dialog ref={dialog} className="footerFAQDialog" aria-labelledby="faq-dialog-title">
                <h2 id="faq-dialog-title">Frequently asked questions</h2>
                <div className="footerFAQAnswers">
                    {questions.map(({ question, answer }) => (
                        <section key={question}>
                            <h3>{question}</h3>
                            <p>{answer}</p>
                        </section>
                    ))}
                </div>
                <form method="dialog" className="footerFAQActions">
                    <button className="footerFAQClose">Close</button>
                </form>
            </dialog>
        </>
    );
}
