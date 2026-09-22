    "use client";

    import { useRef, useState, useEffect } from "react";
    import "./account.css";
    import { useRouter }  from "next/navigation";

    export default function Account() {
        const nameInput = useRef<HTMLInputElement>(null);
        const editButton = useRef<HTMLButtonElement>(null);

        const [isEditing, setIsEditing] = useState(false);
        const [profile, setProfile] = useState({ name: "", email: "" });
        const [draft, setDraft] = useState(profile);

        const [currentPassword, setCurrentPassword] = useState("");
        const [newPassword, setNewPassword] = useState("");

        const [deleteConfirmation, setDeleteConfirmation] = useState("");
        const router = useRouter();

        // Fill the account information after page render
        useEffect(() => {
            async function getUser() {
                // Request the information from the server
                const response = await fetch("/api/user");
                if (!response.ok) return;

                const data = await response.json();
                
                // Call the useState function to change value
                setProfile({
                    name: typeof data?.name === "string" ? data.name : "",
                    email: typeof data?.email === "string" ? data.email : ""
                })
            }

            getUser();

        }, [])

        function finishEditing() {
            setIsEditing(false);
            editButton.current?.focus();
        }

        async function UpdateUser() {

            const response = await fetch("/api/user", {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(
                    {
                        name: draft.name,
                        email: draft.email
                    }
                )
            })

            const data = response.json();

            // If the request was succesful, asign the new values from the draft to the server
            if (response.ok) {
                setProfile({
                    name: draft.name.trim(),
                    email: draft.email.trim()
                });

                finishEditing();
            }
        }

        async function ChangePassword() {

            const response = await fetch("/api/user/password", {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    currentPassword: currentPassword,
                    newPassword: newPassword
                })
            });     

            const data = await response.json();

            if (!response.ok) {
                return;
            }       

            setCurrentPassword("");
            setNewPassword("");
        }

        async function DeleteAccount() {
            const response = await fetch("/api/user", {
                method: "DELETE",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    name: deleteConfirmation
                })
            })

            if (!response.ok) {
                return;
            }

            setDeleteConfirmation("");
            router.push("/login");
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
                            <div className="accountIcon" aria-hidden="true">
                                <svg viewBox="0 0 96 96" role="presentation">
                                    <circle cx="48" cy="34" r="15" />
                                    <path d="M20 78c3-14 14-22 28-22s25 8 28 22" />
                                </svg>
                            </div>

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
                                        <button type="submit" className="profileButton profileSaveButton" onClick={()=>UpdateUser()}>
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
                                        type="password"
                                        placeholder="Current password..."
                                        className="accountInput"
                                        value={currentPassword} onChange={(e)=> setCurrentPassword(e.target.value)}
                                    />
                                </div>
                                <div className="inputGroup">
                                    <label className="inputLabel">New password:</label>
                                    <input
                                        type="password"
                                        placeholder="New password..."
                                        className="accountInput"
                                        value={newPassword} onChange={(e)=> setNewPassword(e.target.value)}
                                    />
                                </div>
                                <button className="passwordButton" onClick={()=>ChangePassword()}>
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
                                value={deleteConfirmation}
                                onChange={(e) => setDeleteConfirmation(e.target.value)}
                            />
                        </div>
                        <button className="deleteButton" onClick={() => DeleteAccount()}>
                            Delete account
                        </button>
                    </section>
                </div>
            </main>
        )
    }
