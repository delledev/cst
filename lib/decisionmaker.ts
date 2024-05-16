export class DecisionTreeNode {
    question: string;
    yesNode: DecisionTreeNode | null;
    noNode: DecisionTreeNode | null;
    solution: string | null;

    constructor(
        question: string,
        yesNode: DecisionTreeNode | null = null,
        noNode: DecisionTreeNode | null = null,
        solution: string | null = null,
    ) {
        this.question = question;
        this.yesNode = yesNode;
        this.noNode = noNode;
        this.solution = solution;
    }
    // ask(): Promise<boolean> {
    //     return new Promise((resolve) => {
    //         // Simulate asking the question asynchronously
    //         console.log(this.question);
    //         let a = prompt(this.question) || ''
    //         const answer = (/true/i).test(a);
    //         resolve(answer);
    //     });
    // }
}

// Define the tree nodes
const powerConnectedNode = new DecisionTreeNode(
    "Is the computer plugged in and the power switch on?",
);
const powerSupplyFanNode = new DecisionTreeNode(
    "Is the power supply fan spinning?",
);
const displayMonitorNode = new DecisionTreeNode(
    "Is there any display on the monitor?",
);
const beepSoundNode = new DecisionTreeNode(
    "Can you hear any beeps when you start the computer?",
);
const checkMonitorConnectionNode = new DecisionTreeNode(
    "Is the monitor is properly connected and switched on.",
    null,
    null,
    null,
);
const powerSupplyCheckNode = new DecisionTreeNode(
    "Check the power supply connections or try a different power supply.",
    null,
    null,
    "Check the power supply connections or try a different power supply.",
);
const checkPowerCableNode = new DecisionTreeNode(
    "Make sure the power cable is properly connected and the power strip is on.",
    null,
    null,
    "Make sure the power cable is properly connected and the power strip is on.",
);
const beepCodeConclusion = new DecisionTreeNode(
    "Beep codes indicate a problem with the memory. Try reseating the RAM sticks or replacing them.",
    null,
    null,
    "Consult to the internet to find a beep code corresponding with your current motherboard to determine the issue.",
);
const removeComponentsNode = new DecisionTreeNode(
    "There may be an issue with the motherboard or other components. Try removing non-essential components and see if it boots.",
    null,
    null,
    "Try removing non-essential components and see if it boots.",
);

const unusualNoisesNode = new DecisionTreeNode(
    "Is the computer making any unusual noises?",
);
const checkCablesNode = new DecisionTreeNode(
    "Check for loose cables and components inside the case.",
    null,
    null,
    "Check for loose cables and components inside the case.",
);
const overheatingNode = new DecisionTreeNode("Is the computer overheating?");
const workingFansNode = new DecisionTreeNode(
    "Ensure that all fans are working and the heatsinks are properly seated.",
    null,
    null,
    "Ensure that all fans are working and the heatsinks are properly seated.",
);
const safeModeNode = new DecisionTreeNode(
    "Check if the computer works in safe mode.",
);
const updateDriversNode = new DecisionTreeNode(
    "There might be a problem with the hardware drivers or the operating system. Try updating drivers or reinstalling the OS.",
    null,
    null,
    "Try updating drivers or reinstalling the OS.",
);
const consultProfessionalNode = new DecisionTreeNode(
    "There may be a hardware failure. Consider consulting a professional.",
    null,
    null,
    "Consider consulting a professional.",
);

//Backtracking
checkMonitorConnectionNode.yesNode = unusualNoisesNode;
checkMonitorConnectionNode.noNode = new DecisionTreeNode(
    "",
    null,
    null,
    "Please make sure monitor is properly connected and it is working.",
);
// Connect the nodes
powerConnectedNode.yesNode = powerSupplyFanNode;
powerConnectedNode.noNode = checkPowerCableNode;

powerSupplyFanNode.yesNode = displayMonitorNode;
powerSupplyFanNode.noNode = powerSupplyCheckNode;

displayMonitorNode.yesNode = beepSoundNode;
displayMonitorNode.noNode = checkMonitorConnectionNode;

beepSoundNode.yesNode = beepCodeConclusion;
beepSoundNode.noNode = removeComponentsNode;

unusualNoisesNode.yesNode = checkCablesNode;
unusualNoisesNode.noNode = overheatingNode;

overheatingNode.yesNode = workingFansNode;
overheatingNode.noNode = safeModeNode;

safeModeNode.yesNode = updateDriversNode;
safeModeNode.noNode = consultProfessionalNode;

// Create a backtrack node to check hardware issues
const checkHardwareIssuesNode = new DecisionTreeNode(
    "Are there any hardware issues like unusual noises or overheating?",
    unusualNoisesNode,
    overheatingNode,
);

// Connect the initial node to the rest of the tree
export const initialNode = new DecisionTreeNode(
    "Does the computer have power issues?",
    powerConnectedNode,
    checkHardwareIssuesNode,
);

// Backtrack connections to ensure all paths are covered logically
removeComponentsNode.noNode = checkHardwareIssuesNode;
checkPowerCableNode.noNode = consultProfessionalNode;
powerSupplyCheckNode.noNode = consultProfessionalNode;
checkMonitorConnectionNode.noNode = consultProfessionalNode;
checkCablesNode.noNode = consultProfessionalNode;
workingFansNode.noNode = consultProfessionalNode;

// let d = initialNode;

// while(true){
//     if(!d.yesNode){
//         console.log(d)
//         console.log(`Solution: ${d.solution}`)
//         break;
//     }
//     let a = prompt(d.question) || ''
//     const answer = (/true/i).test(a);

//     if(answer){
//         d = d.yesNode ? d.yesNode : d
//     } else{
//         d = d.noNode ? d.noNode : d
//     }
// }
