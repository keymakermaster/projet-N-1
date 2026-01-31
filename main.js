document.addEventListener('DOMContentLoaded', () => {
    const searchInput = document.getElementById('search-input');
    const searchBtn = document.getElementById('search-btn');
    const resultDiv = document.getElementById('result');

    const nutrientData = {
        "비타민 C": {
            role: "항산화 작용을 통해 세포를 보호하고, 콜라겐 합성에 관여하여 피부와 뼈 건강을 돕습니다. 또한, 철분의 흡수를 돕고 면역 체계를 강화하는 중요한 역할을 합니다.",
            side_effects: "일반적으로 안전하지만, 하루 2,000mg 이상 과다 복용 시 속 쓰림, 설사, 위장 장애를 유발할 수 있습니다. 신장 결석의 위험을 높일 수도 있습니다.",
            dosage: "성인의 하루 권장 섭취량은 100mg입니다. 흡연자나 특정 질환이 있는 경우 더 많은 양이 필요할 수 있습니다. 과일과 채소를 통해 쉽게 섭취할 수 있습니다."
        },
        "비타민 D": {
            role: "칼슘과 인의 흡수를 도와 뼈를 튼튼하게 만드는 데 필수적입니다. '햇빛 비타민'이라고도 불리며, 면역 기능 조절과 세포 성장에도 중요한 역할을 합니다.",
            side_effects: "과다 섭취 시 혈중 칼슘 농도가 높아져 메스꺼움, 구토, 식욕 부진, 신장 손상 등을 유발할 수 있습니다. 반드시 권장량을 지켜야 합니다.",
            dosage: "성인의 하루 충분 섭취량은 10-15μg(400-600 IU)입니다. 햇빛 노출을 통해 체내에서 합성되거나, 등푸른생선, 버섯 등을 통해 섭취할 수 있습니다."
        },
        "루테인": {
            role: "눈의 망막 중심부에 있는 황반의 구성 성분으로, 강력한 항산화 작용을 합니다. 블루라이트 등 유해한 광선으로부터 눈을 보호하고, 노화로 인한 시력 저하를 늦추는 데 도움을 줍니다.",
            side_effects: "식품을 통한 섭취는 안전하며 특별한 부작용이 보고되지 않았습니다. 하지만 보충제로 과다 복용 시 일시적으로 피부가 노랗게 변하는 카로틴혈증이 나타날 수 있습니다.",
            dosage: "하루 권장 섭취량은 보통 6-20mg입니다. 케일, 시금치 등 녹황색 채소에 풍부하게 함유되어 있습니다."
        }
    };

    const bodyPartData = {
        "눈": {
            nutrients: ["루테인", "비타민 A", "오메가-3", "비타민 C"],
            recommendations: "눈 건강을 위해서는 루테인과 지아잔틴이 풍부한 녹황색 채소, 비타민 A가 풍부한 당근이나 고구마, 그리고 오메가-3가 많은 등푸른생선을 섭취하는 것이 좋습니다. 항산화 작용을 하는 비타민 C도 도움이 됩니다."
        },
        "뼈": {
            nutrients: ["칼슘", "비타민 D", "마그네슘"],
            recommendations: "뼈 건강의 핵심은 칼슘입니다. 우유, 치즈, 멸치 등에 풍부합니다. 칼슘 흡수를 돕는 비타민 D(햇빛, 등푸른생선)와 뼈를 구성하는 마그네슘(견과류, 녹색 채소)을 함께 섭취하는 것이 매우 중요합니다."
        }
    };

    function performSearch() {
        const query = searchInput.value.trim();
        if (!query) {
            resultDiv.innerHTML = "<p>검색어를 입력해주세요.</p>";
            return;
        }

        let resultHTML = "";

        if (nutrientData[query]) {
            const data = nutrientData[query];
            resultHTML = `
                <div class="result-category">
                    <h3>역할</h3>
                    <p>${data.role}</p>
                </div>
                <div class="result-category">
                    <h3>부작용</h3>
                    <p>${data.side_effects}</p>
                </div>
                <div class="result-category">
                    <h3>복용방법</h3>
                    <p>${data.dosage}</p>
                </div>
            `;
        } else if (bodyPartData[query]) {
            const data = bodyPartData[query];
            resultHTML = `
                <div class="result-category">
                    <h3>필요 영양분</h3>
                    <p>${data.nutrients.join(', ')}</p>
                </div>
                <div class="result-category">
                    <h3>추천 정보</h3>
                    <p>${data.recommendations}</p>
                </div>
            `;
        } else {
            resultHTML = `<p>'${query}'에 대한 검색 결과가 없습니다. 철자를 확인하시거나 다른 검색어를 입력해주세요.</p>`;
        }

        resultDiv.innerHTML = resultHTML;
    }

    searchBtn.addEventListener('click', performSearch);
    
    searchInput.addEventListener('keyup', (event) => {
        if (event.key === 'Enter') {
            performSearch();
        }
    });
});