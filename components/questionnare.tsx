"use client";
import { DecisionTreeNode, initialNode } from "@/lib/decisionmaker";
import React, { useEffect, useRef, useState } from "react";

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

    to(node: DecisionTreeNode) {
        while (node != this.questions[this.questions.length - 1]) {
            this.pop();
        }
        this.pop();
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
    const answerRef = useRef(null);
    const topOfThePageRef = useRef(null);

    useEffect(() => {
        let h = history.getHistory();
        setHistoryAnswers(h.answers);
        setHistoryQuestions(h.questions);
    }, [currentNode, history]);

    useEffect(() => {
        if (currentNode.solution) {
            const { current }: any = answerRef;
            if (current != null) {
                current.scrollIntoView({ behavior: "smooth" });
            }
        }
    }, [currentNode]);

    const revert = () => {
        if (history.len()) {
            setCurrentNode(history.pop());
        }
    };
    const revertTo = (node: DecisionTreeNode) => {
        history.to(node);
        setHistory(history);
        setCurrentNode(node);
    };
    const tryAgain = () => {
        const { current }: any = topOfThePageRef;
        if (current != null) {
            current.scrollIntoView({ behavior: "smooth" });
        }
        setTimeout(() => {
            setCurrentNode(initialNode);
            setHistory(new History());
        }, 450);
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
        <div className="flex flex-col w-full h-full" ref={topOfThePageRef}>
            <div className="flex-col h-screen w-full m-auto">
                <div className="flex-col h-full w-full m-auto">
                    <div className="flex h-full w-full m-auto gap-5">
                        <div className="flex bg-transparent h-80 m-auto mr-0 bg-[#1E1E1E] flex-row rounded-xl">
                            <div className="flex h-auto w-[600px] flex-col top-0 bg-[#1c1c1c] pb-12 p-6 rounded-xl ">
                                {currentNode?.solution ? (
                                    <span
                                        className="m-auto text-2xl hover:cursor-pointer"
                                        onClick={() => tryAgain()}
                                    >
                                        Olası bir çözüm için aşağıyı kontrol
                                        edin.
                                    </span>
                                ) : (
                                    <React.Fragment>
                                        <div className="flex bg-[#2D2D2D] p-2 rounded-xl py-8">
                                            <button
                                                className="bg-[#2D2D2D] text-black p-2 left-0 my-auto w-fit hover:text-white transition-all"
                                                onClick={() => revert()}
                                            >
                                                {"<- Geri"}
                                            </button>
                                            <div className="m-auto text-2xl">
                                                {currentNode.question}
                                            </div>
                                        </div>
                                        <div className="flex gap-5 w-full m-auto items-center mt-12">
                                            {currentNode.yesNode && (
                                                <button
                                                    className="m-auto bg-[#2D2D2D] p-2 text-xl rounded-xl w-20 text-[#03DAC6] hover:scale-110 transition-all active:text-[#2d2d2d] active:bg-[#03DAC6] active:rounded-3xl active:scale-90"
                                                    onClick={() => handleYes()}
                                                >
                                                    Evet
                                                </button>
                                            )}
                                            {currentNode.noNode && (
                                                <button
                                                    className="m-auto bg-[#2D2D2D] rounded-xl w-20 text-xl p-2 text-[#CF6679] hover:scale-110 transition-all active:text-[#2d2d2d] active:bg-[#CF6679] active:rounded-3xl active:scale-90"
                                                    onClick={() => handleNo()}
                                                >
                                                    Hayır
                                                </button>
                                            )}
                                        </div>
                                    </React.Fragment>
                                )}
                            </div>
                        </div>
                        <div
                            className={`flex flex-col h-fit gap-1 relative w-[450px] my-[14.2rem] p-2 mr-4 bg-[#1E1E1E] rounded-xl max-h-[500px] overflow-y-auto overflow-x-hidden transition-opacity ${historyQuestions.length == 0 && "opacity-0"}`}
                        >
                            <div className="font-extrabold text-xl p-2 bg-[#2d2d2d] rounded-xl mb-4">
                                Geçmiş
                            </div>
                            {historyQuestions.map((node: any, i: any) => {
                                return (
                                    <div
                                        className="flex w-full bg-[#2d2d2d] p-1 rounded-md hover:cursor-pointer hover:scale-105 transition-all"
                                        onClick={() => revertTo(node)}
                                        key={i}
                                    >
                                        <div className="flex w-full">
                                            {node.question}
                                        </div>
                                        <div className="flex mx-auto w-12 right-0">
                                            {historyAnswers[i] ? (
                                                <p className="text-emerald-400 m-auto">
                                                    Evet
                                                </p>
                                            ) : (
                                                <p className="text-red-400 m-auto">
                                                    Hayır
                                                </p>
                                            )}
                                        </div>
                                    </div>
                                );
                            })}
                        </div>
                    </div>
                </div>
            </div>
            {currentNode.solution && (
                <div className="flex flex-col min-h-[96vh] w-[95vw] text-xl">
                    <div
                        id="#solution"
                        ref={answerRef}
                        className="flex flex-col bg-[#1C1C1C] min-h-[90vh] w-[70vw] m-auto rounded-xl p-8"
                    >
                        <p>
                            <span className="font-extrabold text-xl">
                                {"Olası Çözüm: "}
                            </span>
                            <span className="text-emerald-300 text-xl">
                                {currentNode.solution}
                            </span>
                        </p>
                        <h1 className="mt-12 font-semibold text-2xl">
                            Neden ?
                        </h1>
                        <div className="flex flex-col gap-5">
                            {historyQuestions?.map((node, i) => {
                                if (node.yesFeedback && node.noFeedback)
                                    return (
                                        <p key={i}>
                                            <span className="text-xl font-extrabold">
                                                {`\"${node.question}\" `}
                                            </span>
                                            sorusuna,
                                            <span
                                                className={` font-extrabold text-2xl ${historyAnswers[i] ? "text-emerald-400" : "text-red-400"}`}
                                            >
                                                {historyAnswers[i]
                                                    ? " Evet "
                                                    : " Hayır "}
                                            </span>
                                            cevabını verdiniz. Bu yüzden,{" "}
                                            <span>
                                                {historyAnswers[i]
                                                    ? node.yesFeedback
                                                    : node.noFeedback}
                                            </span>
                                        </p>
                                    );
                                else {
                                    return <></>;
                                }
                            })}
                        </div>
                        <button
                            className="mt-12 m-auto bg-[#2D2D2D] rounded-xl w-auto text-xl p-2 text-[#CF6679] hover:scale-110 transition-all active:text-[#2d2d2d] active:bg-[#CF6679] active:rounded-3xl active:scale-90"
                            onClick={() => tryAgain()}
                        >
                            Sorunum çözülmedi
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Questionnare;
