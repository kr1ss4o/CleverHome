"use client";

import { useRef, useState } from "react";
import "./account.css";

export default function Account() {
    const [isEditing, setIsEditing] = useState(false);
    const [profile, setProfile] = useState({ name: "", email: "" });
    const [draft, setDraft] = useState(profile);
    const nameInput = useRef<HTMLInputElement>(null);
    const editButton = useRef<HTMLButtonElement>(null);

    function finishEditing() {
        setIsEditing(false);
        editButton.current?.focus();
    }

    return(
        <main className="mainPageContainer accountContainer">
            <div className="accountWrapper">
                <section className="accountSection">
                    <div className="profileHeader">
                        <h1 className="sectionHeading">Account personalization</h1>
                        <button
                            ref={editButton}
                            type="button"
                            className="profileButton"
                            aria-controls="profile-form"
                            aria-expanded={isEditing}
                            onClick={() => {
                                if (!isEditing) {
                                    setDraft(profile);
                                    setIsEditing(true);
                                }
                                nameInput.current?.focus();
                            }}
                        >
                            Edit profile
                        </button>
                    </div>
                    <div className="wrapper">
                        <div className="accountIcon"></div>

                        <form
                            id="profile-form"
                            className="personalizationInputs"
                            onSubmit={(e) => {
                                e.preventDefault();
                                if (!isEditing) return;
                                setProfile({ name: draft.name.trim(), email: draft.email.trim() });
                                finishEditing();
                            }}
                        >
                            <div className="inputGroup">
                                <label htmlFor="profile-name" className="inputLabel">Your name:</label>
                                <input
                                    ref={nameInput}
                                    id="profile-name"
                                    name="name"
                                    autoComplete="name"
                                    required
                                    pattern=".*\S.*"
                                    readOnly={!isEditing}
                                    value={isEditing ? draft.name : profile.name}
                                    onChange={(e) => setDraft({ ...draft, name: e.target.value })}
                                    placeholder="Your name..."
                                    className="accountInput"
                                />
                            </div>
                            <div className="inputGroup">
                                <label htmlFor="profile-email" className="inputLabel">Your email:</label>
                                <input
                                    id="profile-email"
                                    name="email"
                                    type="email"
                                    autoComplete="email"
                                    required
                                    readOnly={!isEditing}
                                    value={isEditing ? draft.email : profile.email}
                                    onChange={(e) => setDraft({ ...draft, email: e.target.value })}
                                    placeholder="Your email..."
                                    className="accountInput"
                                />
                            </div>
                            {isEditing && (
                                <div className="profileActions">
                                    <button
                                        type="button"
                                        className="profileButton"
                                        onClick={() => {
                                            setDraft(profile);
                                            finishEditing();
                                        }}
                                    >
                                        Cancel
                                    </button>
                                    <button type="submit" className="profileButton profileSaveButton">
                                        Save changes
                                    </button>
                                </div>
                            )}
                        </form>
                    </div>
                </section>

                <section className="accountSection">
                    <h1 className="sectionHeading">Account security</h1>
                    <div className="aboutInputs">
                            <div className="inputGroup">
                                <label className="inputLabel">Current password:</label>
                                <input
                                    placeholder="Current password..."
                                    className="accountInput"
                                />
                            </div>
                            <div className="inputGroup">
                                <label className="inputLabel">New password:</label>
                                <input
                                    placeholder="New password..."
                                    className="accountInput"
                                />
                            </div>
                            <button className="passwordButton">
                                Change password
                            </button>
                    </div>
                </section>

                <section className="accountSection dangerSection">
                    <h1 className="sectionHeading dangerHeading">Danger zone</h1>
                    <div className="inputGroup">
                        <label className="inputLabel dangerLabel">Enter full name to confirm:</label>
                        <input
                            placeholder="Your current name"
                            className="accountInput dangerInput"
                        />
                    </div>
                    <button className="deleteButton">
                        Delete account
                    </button>
                </section>
            </div>
        </main>
    )
}
