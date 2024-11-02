import React, { createContext, useContext, useState, useEffect } from 'react';

const QuestionaryContext = createContext();

export const QuestionaryProvider = ({ children }) => {
    const questionaryActions = useProvideQuestionary();
    return <QuestionaryContext.Provider value={questionaryActions}>{children}</QuestionaryContext.Provider>;
};

export const useQuestionary = () => {
    return useContext(QuestionaryContext);
};

const useProvideQuestionary = () => {
    const [questionaries, setQuestionaries] = useState([]);
    const [error, setError] = useState('');

    const fetchQuestionaries = async (userId) => {
        try {
            const response = await fetch(`http://localhost:3000/questionary/${userId}`);
            if (!response.ok) throw new Error('Failed to fetch questionnaires');
            const data = await response.json();
            setQuestionaries(data);
        } catch (err) {
            setError('Could not load questionnaires');
        }
    };

    const createQuestionaries = async (email, fullname, phone_number, age, userId, teacher, subject, description) => {
        try {
            const response = await fetch('http://localhost:3000/questionary/send', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ email, fullname, phone_number, age, userId, teacher, subject, description }),
            });

            if (!response.ok) throw new Error('Failed to send questionnaire');

            alert('The questionaire has been sent to the teacher. Wait for the answer');
        } catch (err) {
            setError('Could not send questionnaire');
        }
    };

    const deleteQuestionary = async (questionaryId) => {
        try {
            const response = await fetch(`http://localhost:3000/questionary/${questionaryId}`, {
                method: 'DELETE',
                headers: { 'Content-Type': 'application/json' },
            });
            if (!response.ok) throw new Error('Failed to delete questionnaire');

            setQuestionaries((prevQuestionaries) =>
                prevQuestionaries.filter((questionary) => questionary.id !== questionaryId),
            );
        } catch (err) {
            setError('Could not delete questionnaire');
        }
    };

    return {
        questionaries,
        fetchQuestionaries,
        createQuestionaries,
        deleteQuestionary,
        error,
    };
};
