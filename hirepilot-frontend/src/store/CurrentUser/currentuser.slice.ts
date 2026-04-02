import { createSlice, type PayloadAction } from "@reduxjs/toolkit"
import type { CurrentUserState } from "./currentuser.types"
import { currentUser } from "../../data/userData"
import { saveInterviewResult } from "../Interview/interview.slice"

const initialState: CurrentUserState = currentUser

const currentUserSlice = createSlice({
    name: 'currentUser',
    initialState,
    reducers: {
        setCurrentUser: (
            state,
            action: PayloadAction<Partial<CurrentUserState>>
        ) => {
            Object.assign(state, action.payload)
        },

        resetCurrentUser: () => initialState
    },
    extraReducers: (builder) => {
        builder.addCase(saveInterviewResult, (state, action) => {
            const report = action.payload;
            const technicalScore = (report.technicalScore as number) || 0;
            const communicationScore = (report.communicationScore as number) || 0;
            const overallScore = (report.overallScore as number) || 0;

            // 1. Increment Interview Count
            const oldTotal = state.interviewsCount;
            const newTotal = oldTotal + 1;
            state.interviewsCount = newTotal;

            // 2. Update Success Rate (Running Average)
            state.successRate = Math.round(((state.successRate * oldTotal) + overallScore) / newTotal);

            // 3. Update Readiness Metrics
            state.readiness = state.readiness.map(metric => {
                if (metric.label === 'Technical Depth') {
                    return { ...metric, score: Math.round((metric.score + technicalScore) / 2) };
                }
                if (metric.label === 'Communication') {
                    return { ...metric, score: Math.round((metric.score + communicationScore) / 2) };
                }
                return metric;
            });
        });
    }
})

export const currentUserActions = currentUserSlice.actions
export default currentUserSlice.reducer
