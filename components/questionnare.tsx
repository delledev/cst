"use client";
import { DecisionTreeNode, initialNode } from "@/lib/decisionmaker";
import React, { useEffect, useState } from "react";

class History {
    private questions: DecisionTreeNode[] = [];
    private answers: boolean[] = [];
    push(element: DecisionTreeNode, ans: boolean): void {
        this.answers.push(ans);
        this.questions.push(element);
    }

    pop(): DecisionTreeNode | any {
        this.answers.pop();
        return this.questions.pop();
    }

    len(): number {
        return this.questions.length;
    }
    getHistory(): { questions: DecisionTreeNode[]; answers: boolean[] } {
        return { questions: this.questions, answers: this.answers };
    }
}

const Questionnare = () => {
    const [currentNode, setCurrentNode] =
        useState<DecisionTreeNode>(initialNode);
    const [history, setHistory] = useState<History>(new History());
    const [historyQuestions, setHistoryQuestions] = useState<
        DecisionTreeNode[]
    >([]);
    const [historyAnswers, setHistoryAnswers] = useState<boolean[]>([]);

    useEffect(() => {
        let h = history.getHistory();
        setHistoryAnswers(h.answers);
        setHistoryQuestions(h.questions);
    }, [currentNode, history]);

    const revert = () => {
        if (history.len()) {
            setCurrentNode(history.pop());
        }
    };
    const handleYes = () => {
        if (currentNode.yesNode) {
            history.push(currentNode, true);
            setCurrentNode(currentNode.yesNode);
        } else {
            console.error(currentNode);
        }
    };
    const handleNo = () => {
        if (currentNode.noNode) {
            history.push(currentNode, false);
            setCurrentNode(currentNode.noNode);
        } else {
            console.error(currentNode);
        }
    };
    return (
        <div className="flex h-auto w-[800px]  flex-row top-0  gap-5 m-auto">
            <div className="flex h-auto w-1/2 flex-col">
                {currentNode.solution ? (
                    <div className="flex flex-col">
                        <div className="text-white font-bold flex-col gap-3 flex">
                            <span className="flex-row">
                                Probable Solution:{" "}
                                <span className="font-normal">
                                    {currentNode.solution}
                                </span>
                            </span>
                            <span className="font-semibold">
                                Why am i seeing this ?
                            </span>
                            <span className="font-normal">Because of xyz.</span>
                        </div>
                        <button
                            className="bg-white p-2 w-fit text-black m-auto"
                            onClick={() => setCurrentNode(initialNode)}
                        >
                            {" "}
                            Try Again
                        </button>
                        <button
                            className="bg-white p-2 w-fit text-black m-auto"
                            onClick={() => revert()}
                        >
                            {" "}
                            NotFixed ?{" "}
                        </button>
                    </div>
                ) : (
                    <React.Fragment>
                        <div className="flex gap-4">
                            <button
                                className="bg-white text-black p-2 left-0 m-auto"
                                onClick={() => revert()}
                            >
                                {"<- Back"}
                            </button>
                            <div className="m-auto">{currentNode.question}</div>
                        </div>
                        <div className="flex gap-5 w-full m-auto items-center">
                            {currentNode.noNode && (
                                <button
                                    className="m-auto bg-white p-2 text-black"
                                    onClick={() => handleNo()}
                                >
                                    No
                                </button>
                            )}
                            {currentNode.yesNode && (
                                <button
                                    className="m-auto bg-white p-2 text-black"
                                    onClick={() => handleYes()}
                                >
                                    Yes
                                </button>
                            )}
                        </div>
                    </React.Fragment>
                )}
            </div>

            <div className="flex-col w-1/2">
                <div className="font-extrabold text-xl">History</div>
                {historyQuestions.map((node: any, i: any) => {
                    return (
                        <div className="flex w-full " key={i}>
                            <div className="flex w-full">{node.question}</div>
                            <div className="flex mx-auto w-12 right-0">
                                {historyAnswers[i] ? (
                                    <p className="text-emerald-400 m-auto">
                                        Yes
                                    </p>
                                ) : (
                                    <p className="text-red-400 m-auto">No</p>
                                )}
                            </div>
                        </div>
                    );
                })}
            </div>
        </div>
    );
};

export default Questionnare;
