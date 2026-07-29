import {
    Camera,
    ChevronDown,
    ImagePlus,
} from "lucide-react";

import {
    useRef,
    useState,
    useEffect,
} from "react";

import {
    useNavigate,
    useParams,
} from "react-router-dom";

import "./EditCampaign.css";

import { LoadingModal } from "../../components/LoadingModal/LoadingModal";

import { useToast } from "../../hooks/useToast";

import {
    collection,
    doc,
    getDocs,
    query,
    serverTimestamp,
    updateDoc,
    where,
} from "firebase/firestore";

import { db } from "../../services/firebase";
import { slugify, uploadCampaignCover } from "../../services/storage";

export function EditCampaign() {

const { show } = useToast();

const navigate = useNavigate();

const { slug } = useParams();

const [campaignId, setCampaignId] = useState("");

const [creating, setCreating] = useState(false);

const fileInputRef = useRef<HTMLInputElement>(null);

const [coverPreview, setCoverPreview] = useState("");
const [coverFile, setCoverFile] = useState<File | null>(null);

const [coverPosition, setCoverPosition] = useState({
    x: 50,
    y: 50,
});

const [dragging, setDragging] = useState(false);

const previewRef = useRef<HTMLDivElement>(null);

const [title, setTitle] = useState("");

const [category, setCategory] = useState("");

const [status, setStatus] = useState("Ativa");

const [duration, setDuration] = useState("30 dias");

const [featured, setFeatured] = useState(false);

const [goalAmount, setGoalAmount] = useState("");

const [raisedAmount, setRaisedAmount] = useState("");

const [pixKey, setPixKey] = useState("");

const [topicOne, setTopicOne] = useState("");

const [topicTwo, setTopicTwo] = useState("");

const [topicThree, setTopicThree] = useState("");

const [story, setStory] = useState("");

const [beneficiaryName, setBeneficiaryName] = useState("");

const [city, setCity] = useState("");

const [state, setState] = useState("");

function handleMouseDown() {

    setDragging(true);

}

function handleMouseUp() {

    setDragging(false);

}

function handleMouseMove(
    event: React.MouseEvent<HTMLDivElement>
) {

    if (!dragging || !previewRef.current) return;

    const rect = previewRef.current.getBoundingClientRect();

    const x =
        ((event.clientX - rect.left) / rect.width) * 100;

    const y =
        ((event.clientY - rect.top) / rect.height) * 100;

    setCoverPosition({

        x: Math.min(100, Math.max(0, x)),

        y: Math.min(100, Math.max(0, y)),

    });

}


async function handleSelectCover(
    event: React.ChangeEvent<HTMLInputElement>
) {

    const file = event.target.files?.[0];

    if (!file) return;

    setCoverFile(file);

    setCoverPreview(URL.createObjectURL(file));

}

function formatCurrency(value: string) {

    const numbers = value.replace(/\D/g, "");

    const amount = Number(numbers) / 100;

    return amount.toLocaleString("pt-BR", {
        style: "currency",
        currency: "BRL",
    });

}

function numberToCurrency(value: number) {

    return value.toLocaleString("pt-BR", {
        style: "currency",
        currency: "BRL",
    });

}

function currencyToNumber(value: string) {

    return Number(
        value
            .replace(/\s/g, "")
            .replace("R$", "")
            .replace(/\./g, "")
            .replace(",", ".")
    );

}

function validateForm() {

    if (!coverPreview) return "Selecione uma imagem para a campanha.";

    if (!title.trim()) return "Informe o título da campanha.";

    if (!category) return "Selecione uma categoria.";

    if (!status) return "Selecione o status.";

    if (!duration) return "Informe a duração.";

    if (!goalAmount) return "Informe a meta da campanha.";

    if (!topicOne.trim()) return "Preencha o Tópico 1.";

    if (!topicTwo.trim()) return "Preencha o Tópico 2.";

    if (!topicThree.trim()) return "Preencha o Tópico 3.";

    if (!story.trim()) return "Escreva a história da campanha.";

    if (!beneficiaryName.trim()) return "Informe o beneficiário.";

    if (!city.trim()) return "Informe a cidade.";

    if (!state.trim()) return "Informe o estado.";

    return null;

}


function resetForm() {

    setCoverFile(null);

    setCoverPreview("");

    setCoverPosition({
        x: 50,
        y: 50,
    });

    setTitle("");

    setCategory("");

    setStatus("");

    setDuration("");

    setFeatured(false);

    setGoalAmount("");

    setRaisedAmount("");

    setPixKey("");

    setTopicOne("");

    setTopicTwo("");

    setTopicThree("");

    setStory("");

    setBeneficiaryName("");

    setCity("");

    setState("");

}

async function handleUpdateCampaign() {

    const error = validateForm();

    if (error) {

        show({
            type: "error",
            title: "Campos obrigatórios",
            message: error,
        });

        return;

    }

    try {

        setCreating(true);

        let coverImage = coverPreview;

        if (coverFile) {

            coverImage = await uploadCampaignCover(
                coverFile,
                category,
                title
            );

        }

        const slug = slugify(title);

        await updateDoc(
    doc(db, "campaigns", campaignId),
    {
            slug,

            title,

            category,

            coverImage,

            coverPositionX: coverPosition.x,

            coverPositionY: coverPosition.y,

            duration,

            status,

            featured,

            topics: [
                topicOne,
                topicTwo,
                topicThree,
            ],

            story,

            goalAmount: currencyToNumber(goalAmount),

            raisedAmount: currencyToNumber(raisedAmount),

            pixKey,

            beneficiaryName,

            city,

            state,

            updatedAt: serverTimestamp(),

        });

   

        show({
            type: "success",
            title: "Campanha atualizada",
            message: "As alterações foram salvas com sucesso.",
        });

        sessionStorage.removeItem("createCampaignForm");

        resetForm();

        navigate("/campanhas");

    } catch (error) {

        console.error(error);

        setCreating(false);

        show({
            type: "error",
            title: "Erro",
            message: "Não foi possível atualizar a campanha.",
        });

        return;

    }

}

useEffect(() => {

    async function loadCampaign() {

        if (!slug) return;

        try {

            const snapshot = await getDocs(
                query(
                    collection(db, "campaigns"),
                    where("slug", "==", slug)
                )
            );

            if (snapshot.empty) {

                navigate("/campanhas");

                return;

            }

            const campaign = snapshot.docs[0];

            setCampaignId(campaign.id);

            const data = campaign.data();

            setCoverPreview(data.coverImage ?? "");

            setCoverPosition({
                x: data.coverPositionX ?? 50,
                y: data.coverPositionY ?? 50,
            });

            setTitle(data.title ?? "");

            setCategory(data.category ?? "");

            setStatus(data.status || "Ativa");

            setDuration(data.duration || "30 dias");

            setFeatured(data.featured ?? false);

            setGoalAmount(
                numberToCurrency(data.goalAmount ?? 0)
            );

            setRaisedAmount(
                numberToCurrency(data.raisedAmount ?? 0)
            );

            setPixKey(data.pixKey ?? "");

            setTopicOne(data.topics?.[0] ?? "");

            setTopicTwo(data.topics?.[1] ?? "");

            setTopicThree(data.topics?.[2] ?? "");

            setStory(data.story ?? "");

            setBeneficiaryName(data.beneficiaryName ?? "");

            setCity(data.city ?? "");

            setState(data.state ?? "");

        } catch (error) {

            console.error(error);

            navigate("/campanhas");

        }

    }

    loadCampaign();

}, [slug, navigate]);

    return (

        <section className="create-campaign">

            <div className="create-campaign-header">

                <div>

                    <h1>Editar campanha</h1>

                   <p>
                        Atualize as informações da campanha.
                    </p>

                </div>

            </div>

            <form>

                <div className="create-card">

                    <div className="create-card-title">

                        <Camera size={20} />

                        <h2>Foto da campanha</h2>

                    </div>

                    <div
                        ref={previewRef}
                        className="campaign-cover-preview"
                        onMouseDown={handleMouseDown}
                        onMouseMove={handleMouseMove}
                        onMouseUp={handleMouseUp}
                        onMouseLeave={handleMouseUp}
                    >

                        {coverPreview ? (

                            <img
                                src={coverPreview}
                                alt="Capa da campanha"
                                style={{
                                    objectPosition: `${coverPosition.x}% ${coverPosition.y}%`,
                                }}
                            />

                        ) : (

                            <>

                                <ImagePlus size={42} />

                                <span>
                                    Nenhuma imagem selecionada
                                </span>

                            </>

                        )}

                        

                    </div>

                    <input
                            ref={fileInputRef}
                            type="file"
                            accept="image/*"
                            hidden
                            onChange={handleSelectCover}
                        />

                        <div className="cover-upload-button">

                            <button
                                type="button"
                                onClick={() => fileInputRef.current?.click()}
                            >
                                {coverPreview ? "Alterar capa" : "Escolher imagem"}
                            </button>

                        </div>

                </div>

                <div className="create-card">

                    <div className="create-card-title">

                        <h2>Informações da campanha</h2>

                    </div>

                    <div className="create-form">

                        <div className="form-group">

                            <label>Título</label>

                            <input
                                type="text"
                                placeholder="Ex.: Ajude João a realizar uma cirurgia"
                                value={title}
                                onChange={(e) => setTitle(e.target.value)}
                            />

                        </div>

                        <div className="form-row">

                            <div className="form-group">

                                <label>Categoria</label>

                                <div className="select-wrapper">

                                    <select
                                        value={category}
                                        onChange={(e) => setCategory(e.target.value)}
                                    >

                                        <option value="">
                                            Selecione
                                        </option>

                                        <option value="Saúde">
                                            Saúde
                                        </option>

                                        <option value="Educação">
                                            Educação
                                        </option>

                                        <option value="Animais">
                                            Animais
                                        </option>

                                        <option value="Emergência">
                                            Emergência
                                        </option>

                                        <option value="Social">
                                            Social
                                        </option>

                                        <option value="Esporte">
                                            Esporte
                                        </option>

                                        <option value="Outro">
                                            Outro
                                        </option>

                                    </select>

                                    <ChevronDown size={18} />

                                </div>

                            </div>

                            <div className="form-group">

                                <label>Status</label>

                                <div className="select-wrapper">

                                    <select
                                        value={status}
                                        onChange={(e) => setStatus(e.target.value)}
                                    >

                                        <option>Ativa</option>

                                        <option>Pausada</option>

                                        <option>Encerrada</option>

                                    </select>

                                    <ChevronDown size={18} />

                                </div>

                            </div>

                        </div>

                        <div className="form-row">

                            <div className="form-group">

                                <label>Tempo da vaquinha</label>

                                <div className="select-wrapper">

                                    <select
                                        value={duration}
                                        onChange={(e) => setDuration(e.target.value)}
                                    >

                                        <option>10 dias</option>

                                        <option>20 dias</option>

                                        <option>30 dias</option>

                                        <option>60 dias</option>

                                        <option>90 dias</option>

                                        <option>Sem prazo</option>

                                    </select>

                                    <ChevronDown size={18} />

                                </div>

                            </div>

                            <div className="form-group">

                                <label>Campanha em destaque</label>

                                <button
                                    type="button"
                                    className={`switch ${featured ? "active" : ""}`}
                                    onClick={() => setFeatured(!featured)}
                                >

                                    <span className="switch-thumb" />

                                </button>

                            </div>

                        </div>

                        <div className="form-row">

                            <div className="form-group">

                                <label>Meta da campanha</label>

                                <input
                                    type="text"
                                    placeholder="R$ 0,00"
                                    value={goalAmount}
                                    onChange={(e) =>
                                        setGoalAmount(
                                            formatCurrency(e.target.value)
                                        )
                                    }
                                />

                            </div>

                            <div className="form-group">

                                <label>Valor arrecadado</label>

                                <input
                                    type="text"
                                    placeholder="R$ 0,00"
                                    value={raisedAmount}
                                    onChange={(e) =>
                                        setRaisedAmount(
                                            formatCurrency(e.target.value)
                                        )
                                    }
                                />

                            </div>

                        </div>

                        <div className="form-group">

                            <label>Chave PIX</label>

                            <input
                                type="text"
                                placeholder="Digite a chave PIX da campanha"
                                value={pixKey}
                                onChange={(e) => setPixKey(e.target.value)}
                            />

                        </div>

                    </div>

                </div>

                <div className="create-card">

                    <div className="create-card-title">

                        <h2>Conteúdo da campanha</h2>

                    </div>

                    <div className="create-form">

                        <div className="form-group">

                            <label>Tópico 1</label>

                            <input
                                type="text"
                                placeholder="Primeiro destaque da campanha"
                                value={topicOne}
                                onChange={(e) => setTopicOne(e.target.value)}
                            />

                        </div>

                        <div className="form-group">

                            <label>Tópico 2</label>

                            <input
                                type="text"
                                placeholder="Segundo destaque da campanha"
                                value={topicTwo}
                                onChange={(e) => setTopicTwo(e.target.value)}
                            />

                        </div>

                        <div className="form-group">

                            <label>Tópico 3</label>

                            <input
                                type="text"
                                placeholder="Terceiro destaque da campanha"
                                value={topicThree}
                                onChange={(e) => setTopicThree(e.target.value)}
                            />

                        </div>

                        <div className="form-group">

                            <label>História da campanha</label>

                            <textarea
                                placeholder="Conte toda a história da campanha..."
                                value={story}
                                onChange={(e) => setStory(e.target.value)}
                            />

                        </div>

                    </div>

                </div>

                <div className="create-card">

                    <div className="create-card-title">

                        <h2>Beneficiário</h2>

                    </div>

                    <div className="create-form">

                        <div className="form-group">

                            <label>Nome do beneficiário</label>

                            <input
                                type="text"
                                placeholder="Nome completo"
                                value={beneficiaryName}
                                onChange={(e) => setBeneficiaryName(e.target.value)}
                            />

                        </div>

                        <div className="form-group">

                            <label>Cidade</label>

                            <input
                                type="text"
                                placeholder="Cidade"
                                value={city}
                                onChange={(e) => setCity(e.target.value)}
                            />

                        </div>

                        <div className="form-group">

                            <label>Estado</label>

                            <input
                                type="text"
                                placeholder="Ex: SP"
                                maxLength={2}
                                value={state}
                                onChange={(e) =>
                                    setState(e.target.value.toUpperCase())
                                }
                            />

                        </div>

                    </div>

                </div>

                <div className="create-actions">

                    <button
                        type="button"
                        className="cancel-button"
                        onClick={() => {

                            sessionStorage.removeItem("createCampaignForm");

                            navigate("/campanhas");

                        }}
                    >
                        Cancelar
                    </button>

                    <button
                        type="button"
                        className="create-button"
                        onClick={handleUpdateCampaign}
                        disabled={creating}
                    >
                        {creating ? "Salvando campanha..." : "Salvar Alterações"}
                    </button>

                </div>

            </form>


            <LoadingModal
                    open={creating}
                    title="Salvando campanha..."
                    description="Aguarde enquanto atualizamos a campanha."
                />

        </section>

    );

}