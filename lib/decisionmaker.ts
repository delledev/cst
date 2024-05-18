export class DecisionTreeNode {
    question: string;
    yesNode: DecisionTreeNode | null;
    noNode: DecisionTreeNode | null;
    solution: string | null;
    yesFeedback: string | null;
    noFeedback: string | null;

    constructor(
        question: string,
        yesNode: DecisionTreeNode | null = null,
        noNode: DecisionTreeNode | null = null,
        solution: string | null = null,
        yesFeedback: string | null = null,
        noFeedback: string | null = null,
    ) {
        this.question = question;
        this.yesNode = yesNode;
        this.noNode = noNode;
        this.solution = solution;
        this.yesFeedback = yesFeedback;
        this.noFeedback = noFeedback;
    }
}

// Define the tree nodes
const powerConnectedNode = new DecisionTreeNode(
    "Bilgisayarın fişi takılı ve güç düğmesi açık mı?",
);
powerConnectedNode.yesFeedback =
    "Güç açık olduğuna göre, sorun donanımla veya monitörle ilgili olabilir.";
powerConnectedNode.noFeedback =
    "Güç olmadığından, sorun anakart veya güç kaynağı ünitesinde olabilir.";

const powerSupplyFanNode = new DecisionTreeNode(
    "Güç kaynağının fanı dönüyor mu?",
);
powerSupplyFanNode.yesFeedback =
    "Güç kaynağının fanı dönüyor, bu da gücün iletildiğini gösterir.";
powerSupplyFanNode.noFeedback =
    "Güç kaynağının fanı dönmüyorsa, bu güç kaynağı sorunu olduğunu gösterebilir.";

const displayMonitorNode = new DecisionTreeNode(
    "Monitörde herhangi bir görüntü var mı?",
);
displayMonitorNode.yesFeedback =
    "Monitörde görüntü varsa, sistemin açıldığını ve monitörün çalıştığını gösterir.";
displayMonitorNode.noFeedback =
    "Görüntü yoksa, monitör veya bilgisayarın grafik çıkışıyla ilgili bir sorun olabilir.";

const beepSoundNode = new DecisionTreeNode(
    "Bilgisayarı başlattığınızda herhangi bir bip sesi duyuyor musunuz?",
);
beepSoundNode.yesFeedback =
    "Bip sesleri, donanım sorunlarını teşhis etmeye yardımcı olabilecek POST (Güç Açma Kendini Test Etme) işleminin çalıştığını gösterir.";
beepSoundNode.noFeedback =
    "Bip seslerinin olmaması, özellikle anakart veya RAM gibi bileşenlerle ilgili donanım sorunlarını işaret edebilir.";

const checkMonitorConnectionNode = new DecisionTreeNode(
    "Monitör doğru şekilde bağlanmış ve açık mı?",
    null,
    null,
    null,
);
checkMonitorConnectionNode.yesFeedback =
    "Doğru bağlanmış ve açık bir monitör, güvenilir bir görüntü bağlantısını sağlar.";
checkMonitorConnectionNode.noFeedback =
    "Monitörün doğru şekilde bağlandığından ve açık olduğundan emin olun.";

const powerSupplyCheckNode = new DecisionTreeNode(
    "Güç kaynağı bağlantılarını kontrol edin veya farklı bir güç kaynağı deneyin.",
    null,
    null,
    "Güç kaynağı bağlantılarını kontrol edin veya farklı bir güç kaynağı deneyin.",
);
powerSupplyCheckNode.yesFeedback =
    "Güç kaynağı bağlantılarının kontrol edilmesi, güç iletim sorunlarını çözebilir.";
powerSupplyCheckNode.noFeedback =
    "Güç kaynağı bağlantıları doğruysa, farklı bir güç kaynağı ünitesini deneyin.";

const checkPowerCableNode = new DecisionTreeNode(
    "Güç kablosunun düzgün şekilde bağlandığından ve güç şeridinin açık olduğundan emin olun.",
    null,
    null,
    "Güç kablosunun düzgün şekilde bağlandığından ve güç şeridinin açık olduğundan emin olun.",
);
checkPowerCableNode.yesFeedback =
    "Güç kablosunun güvenli bir şekilde bağlanması, gücün sisteme ulaştığını garanti eder.";
checkPowerCableNode.noFeedback =
    "Güç kablosu bağlantısını kontrol edin ve güç şeridinin veya prizinin çalıştığından emin olun.";

const beepCodeConclusion = new DecisionTreeNode(
    "Bip kodları, bellekle ilgili bir sorunu işaret ediyor. RAM modüllerini yeniden takmayı veya değiştirmeyi deneyin.",
    null,
    null,
    "Mevcut anakartınıza ait bir bip kodunu bulmak için interneti araştırın ve sorunu belirleyin.",
);
beepCodeConclusion.yesFeedback =
    "Bip kodları, özellikle bellekle ilgili donanım sorunlarını belirlemeye yardımcı olabilir.";
beepCodeConclusion.noFeedback =
    "Bip kodlarının olmaması, bellek sorunlarının ötesinde başka donanım sorunlarını işaret edebilir.";

const removeComponentsNode = new DecisionTreeNode(
    "Anakart veya diğer bileşenlerde bir sorun olabilir. Gereksiz bileşenleri çıkarın ve sistemin açılıp açılmadığını kontrol edin.",
    null,
    null,
    "Gereksiz bileşenleri çıkarın ve sistemin açılıp açılmadığını kontrol edin.",
);
removeComponentsNode.yesFeedback =
    "Gereksiz bileşenlerin çıkarılması, donanım sorunlarını izole etmeye yardımcı olabilir.";
removeComponentsNode.noFeedback =
    "Bileşenlerin çıkarılması sorunu çözmezse, daha fazla teşhis gerekebilir.";

const unusualNoisesNode = new DecisionTreeNode(
    "Bilgisayar alışılmadık sesler çıkarıyor mu?",
);
unusualNoisesNode.yesFeedback =
    "Alışılmadık sesler, fan sorunları veya bileşen arızaları gibi donanım sorunlarını gösterebilir.";
unusualNoisesNode.noFeedback =
    "Alışılmadık seslerin olmaması, mekanik arızaların ötesinde potansiyel sorunları işaret eder.";

const checkCablesNode = new DecisionTreeNode(
    "Kasa içindeki gevşek kabloları ve bileşenleri kontrol edin.",
    null,
    null,
    "Kasa içindeki gevşek kabloları ve bileşenleri kontrol edin.",
);
checkCablesNode.yesFeedback =
    "Gevşek kablolar veya bileşenler elektriksel veya bağlantı sorunlarına neden olabilir.";
checkCablesNode.noFeedback =
    "Kablolar ve bileşenler güvenliyse, sorun başka bir yerde olabilir.";

const overheatingNode = new DecisionTreeNode("Bilgisayar aşırı ısınıyor mu?");
overheatingNode.yesFeedback =
    "Aşırı ısınma, sistem kararsızlığına ve bileşen hasarına yol açabilir.";
overheatingNode.noFeedback =
    "Sistem aşırı ısınmıyorsa, soruna neden olan diğer faktörler olabilir.";

const workingFansNode = new DecisionTreeNode(
    "Tüm fanların çalıştığından ve soğutucuların düzgün şekilde yerleştirildiğinden emin olun.",
    null,
    null,
    "Tüm fanların çalıştığından ve soğutucuların düzgün şekilde yerleştirildiğinden emin olun.",
);
workingFansNode.yesFeedback =
    "Doğru fan ve soğutucu çalışması, kritik bileşenlerin soğutulması için önemlidir.";
workingFansNode.noFeedback =
    "Çalışmayan fanlar veya yanlış yerleştirilmiş soğutucular aşırı ısınmaya yol açabilir.";

const safeModeNode = new DecisionTreeNode(
    "Bilgisayar güvenli modda çalışıyor mu?",
);
safeModeNode.yesFeedback =
    "Güvenli modda başarılı bir şekilde çalışması, yazılımla ilgili sorunları işaret edebilir.";
safeModeNode.noFeedback =
    "Güvenli mod sorunu çözmezse, donanım sorunları daha olasıdır.";

const updateDriversNode = new DecisionTreeNode(
    "Donanım sürücüleri veya işletim sistemiyle ilgili bir sorun olabilir. Sürücüleri güncellemeyi veya işletim sistemini yeniden yüklemeyi deneyin.",
    null,
    null,
    "Sürücüleri güncellemeyi veya işletim sistemini yeniden yüklemeyi deneyin.",
);
updateDriversNode.yesFeedback =
    "Sürücülerin güncellenmesi, uyumluluk sorunlarını veya yazılım ile ilgili problemleri çözebilir.";
updateDriversNode.noFeedback =
    "Sürücülerin güncellenmesi yardımcı olmazsa, işletim sistemini yeniden yüklemeyi veya daha fazla teşhis yapmayı düşünün.";

const consultProfessionalNode = new DecisionTreeNode(
    "Donanım arızası olabilir. Profesyonel yardım almayı düşünün.",
    null,
    null,
    "Profesyonel yardım almayı düşünün.",
);
consultProfessionalNode.yesFeedback =
    "Profesyonel yardım, karmaşık donanım sorunlarını teşhis ve çözme konusunda yardımcı olabilir.";
consultProfessionalNode.noFeedback =
    "Sorun giderme işlemlerinden sonra sorun devam ederse, profesyonel tavsiye gerekebilir.";

// Backtracking
checkMonitorConnectionNode.yesNode = unusualNoisesNode;
checkMonitorConnectionNode.noNode = new DecisionTreeNode(
    "",
    null,
    null,
    "Lütfen monitörün doğru şekilde bağlandığından ve çalıştığından emin olun.",
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
    "Alışılmadık sesler veya aşırı ısınma gibi donanım sorunları var mı?",
    unusualNoisesNode,
    overheatingNode,
    null,
    "Sorun, fan arızası, bileşen aşırı ısınması veya diğer donanım ile ilgili sorunlarla ilgili olabilir.",
    "Sorun, yazılım sorunları, bağlantı problemleri veya donanım dışı diğer sorunlarla ilgili olabilir.",
);

export const initialNode = new DecisionTreeNode(
    "Bilgisayarın güç sorunları var mı?",
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
