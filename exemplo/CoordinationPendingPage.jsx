import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Loader2, CheckCircle, XCircle, FileText, Calendar, AlertCircle, Eye, Copy, Check, ClipboardList } from 'lucide-react';
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogFooter,
} from '@/components/ui/dialog';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Input } from '@/components/ui/input';
import solicitacaoDefesaService from '@/services/solicitacaoDefesaService';
import { format } from 'date-fns';
import { ptBR } from 'date-fns/locale';
import { useAuth } from '@/contexts/AuthContext';
import { isCoordinator } from '@/lib/permissions';

// Componente para gerar o HTML do formulário de detalhes
function DetailFormHTML({ solicitacao }) {
    const getTipoSolicitacaoCheckbox = (tipo) => {
        const tipos = {
            'QUAL_DISS': { label: 'Exame de Qualificação de Dissertação', row: 1 },
            'DEF_DISS': { label: 'Defesa de Dissertação', row: 1 },
            'QUAL_PROJ_TESE': { label: 'Exame de Qualificação de Projeto de Tese', row: 2 },
            'DEF_TESE': { label: 'Defesa de Tese', row: 2 },
            'QUAL_TESE': { label: 'Exame de Qualificação de Tese', row: 3 },
        };
        return tipos[tipo] || { label: tipo, row: 1 };
    };

    const tipoInfo = getTipoSolicitacaoCheckbox(solicitacao.tipo_solicitacao);

    // Parsear membros da banca
    const membros = solicitacao.membros_banca || [];

    const formatDataProposta = (data) => {
        if (!data) return 'N/D';
        try {
            return format(new Date(data), 'dd/MM/yyyy');
        } catch {
            return data;
        }
    };

    const formatDataAtual = () => {
        return format(new Date(), "dd 'de' MMMM 'de' yyyy", { locale: ptBR });
    };

    return (
        <div style={{ width: '100%', fontFamily: 'Arial, sans-serif', fontSize: '12px', }}>
            {/* Header */}
            <table style={{ width: '100%', borderCollapse: 'collapse', marginBottom: '16px' }}>
                <tr>
                    <td style={{
                        backgroundColor: '#004a80',
                        color: '#fff',
                        padding: '10px',
                        border: '1px solid #000',
                        fontWeight: 'bold',
                        textAlign: 'center'
                    }}>
                        SOLICITAÇÃO DE AGENDAMENTO DE EXAME DE QUALIFICAÇÃO/ DEFESA DE DISSERTAÇÃO / TESE
                    </td>
                </tr>
            </table>

            <></>

            {/* Tipo de Solicitação */}
            <table style={{ width: '100%', borderCollapse: 'collapse', marginBottom: '16px' }}>
                <tbody>
                    <tr>
                        <td colSpan="2" style={{
                            backgroundColor: '#004a80',
                            color: '#fff',
                            padding: '10px',
                            border: '1px solid #000',
                            fontWeight: 'bold'
                        }}>
                            SOLICITAMOS O AGENDAMENTO DO(A):
                        </td>
                    </tr>
                    <tr>
                        <td style={{ border: '1px solid #000', padding: '7px' }}>
                            {solicitacao.tipo_solicitacao === 'QUAL_DISS' ? '(x)' : '( )'} Exame de Qualificação de Dissertação
                        </td>
                        <td style={{ border: '1px solid #000', padding: '7px' }}>
                            {solicitacao.tipo_solicitacao === 'DEF_DISS' ? '(x)' : '( )'} Defesa de Dissertação
                        </td>
                    </tr>
                    <tr>
                        <td style={{ border: '1px solid #000', padding: '7px' }}>
                            {solicitacao.tipo_solicitacao === 'QUAL_PROJ_TESE' ? '(x)' : '( )'} Exame de Qualificação de Projeto de Tese
                        </td>
                        <td style={{ border: '1px solid #000', padding: '7px' }}>
                            {solicitacao.tipo_solicitacao === 'DEF_TESE' ? '(x)' : '( )'} Defesa de Tese
                        </td>
                    </tr>
                    <tr>
                        <td style={{ border: '1px solid #000', padding: '7px' }}>
                            {solicitacao.tipo_solicitacao === 'QUAL_TESE' ? '(x)' : '( )'} Exame de Qualificação de Tese
                        </td>
                        <td style={{ border: '1px solid #000', padding: '7px' }}>&nbsp;</td>
                    </tr>
                </tbody>
            </table>

            {/* Identificação do Projeto */}
            <table style={{ width: '100%', borderCollapse: 'collapse', marginBottom: '16px' }}>
                <tbody>
                    <tr>
                        <td colSpan="2" style={{
                            backgroundColor: '#004a80',
                            color: '#fff',
                            padding: '10px',
                            border: '1px solid #000',
                            fontWeight: 'bold'
                        }}>
                            IDENTIFICAÇÃO DO PROJETO:
                        </td>
                    </tr>
                    <tr>
                        <td style={{ border: '1px solid #000', padding: '7px', width: '150px', fontWeight: 'bold' }}>Título:</td>
                        <td style={{ border: '1px solid #000', padding: '7px' }}>{solicitacao.titulo_projeto || 'N/D'}</td>
                    </tr>
                    <tr>
                        <td style={{ border: '1px solid #000', padding: '7px', fontWeight: 'bold' }}>Pós-Graduando:</td>
                        <td style={{ border: '1px solid #000', padding: '7px' }}>{solicitacao.pos_graduando_nome || 'N/D'}</td>
                    </tr>
                    <tr>
                        <td style={{ border: '1px solid #000', padding: '7px', fontWeight: 'bold' }}>Orientador:</td>
                        <td style={{ border: '1px solid #000', padding: '7px' }}>
                            {solicitacao.orientador_nome || 'N/D'}
                            {solicitacao.coorientador_nome && (
                                <><br />{solicitacao.coorientador_nome}</>
                            )}
                        </td>
                    </tr>
                </tbody>
            </table>

            {/* Banca Proposta */}
            <table style={{ width: '100%', borderCollapse: 'collapse', marginBottom: '16px' }}>
                <tbody>
                    <tr>
                        <td style={{
                            backgroundColor: '#004a80',
                            color: '#fff',
                            padding: '10px',
                            border: '1px solid #000',
                            fontWeight: 'bold',
                            width: '180px'
                        }}>
                            BANCA PROPOSTA
                        </td>
                        <td style={{ backgroundColor: '#004a80', color: '#fff', padding: '10px', border: '1px solid #000', fontWeight: 'bold' }}>NOME</td>
                        <td style={{ backgroundColor: '#004a80', color: '#fff', padding: '10px', border: '1px solid #000', fontWeight: 'bold' }}>CPF</td>
                        <td style={{ backgroundColor: '#004a80', color: '#fff', padding: '10px', border: '1px solid #000', fontWeight: 'bold' }}>IES</td>
                        <td style={{ backgroundColor: '#004a80', color: '#fff', padding: '10px', border: '1px solid #000', fontWeight: 'bold' }}>PPG VINCULADO</td>
                    </tr>
                    {membros.length > 0 ? membros.map((membro, index) => (
                        <tr key={index}>
                            <td style={{ border: '1px solid #000', padding: '7px' }}>
                                {index + 1}. {membro.tipo_membro_display || membro.tipo_membro || 'Membro'}
                                {membro.is_suplente && ' (Suplente)'}:
                            </td>
                            <td style={{ border: '1px solid #000', padding: '7px' }}>{membro.nome}</td>
                            <td style={{ border: '1px solid #000', padding: '7px' }}>{membro.cpf || '-'}</td>
                            <td style={{ border: '1px solid #000', padding: '7px' }}>{membro.ies || '-'}</td>
                            <td style={{ border: '1px solid #000', padding: '7px' }}>{membro.ppg_vinculado || '-'}</td>
                        </tr>
                    )) : (
                        <tr>
                            <td colSpan="5" style={{ border: '1px solid #000', padding: '7px', textAlign: 'center', color: '#666' }}>
                                Nenhum membro da banca cadastrado
                            </td>
                        </tr>
                    )}
                </tbody>
            </table>

            {/* Informações Adicionais */}
            <table style={{ width: '100%', borderCollapse: 'collapse', marginBottom: '16px' }}>
                <tbody>
                    <tr>
                        <td colSpan="6" style={{
                            backgroundColor: '#004a80',
                            color: '#fff',
                            padding: '10px',
                            border: '1px solid #000',
                            fontWeight: 'bold'
                        }}>
                            INFORMAÇÕES ADICIONAIS
                        </td>
                    </tr>
                    <tr>
                        <td style={{ border: '1px solid #000', padding: '7px', fontWeight: 'bold' }}>Data Proposta:</td>
                        <td style={{ border: '1px solid #000', padding: '7px' }}>{formatDataProposta(solicitacao.data_proposta)}</td>
                        <td style={{ border: '1px solid #000', padding: '7px', fontWeight: 'bold' }}>Horário Proposto:</td>
                        <td style={{ border: '1px solid #000', padding: '7px' }}>{solicitacao.horario_proposto || 'N/D'}</td>
                    </tr>
                    <tr>
                        <td style={{ border: '1px solid #000', padding: '7px', fontWeight: 'bold' }}>Local:</td>
                        <td colSpan="3" style={{ border: '1px solid #000', padding: '7px' }}>{solicitacao.local_proposto || 'N/D'}</td>
                    </tr>
                    <tr>
                        <td colSpan="2" style={{ border: '1px solid #000', padding: '7px' }}>Haverá participação de docente por meio de videoconferência?</td>
                        <td colSpan="2" style={{ border: '1px solid #000', padding: '7px', textAlign: 'center' }}>
                            {solicitacao.videoconferencia ? '(x) Sim    ( ) Não' : '( ) Sim    (x) Não'}
                        </td>
                    </tr>
                    {solicitacao.link_videoconferencia && (
                        <tr>
                            <td style={{ border: '1px solid #000', padding: '7px', fontWeight: 'bold' }}>Link:</td>
                            <td colSpan="3" style={{ border: '1px solid #000', padding: '7px' }}>
                                <a href={solicitacao.link_videoconferencia} target="_blank" rel="noopener noreferrer" style={{ color: '#004a80' }}>
                                    {solicitacao.link_videoconferencia}
                                </a>
                            </td>
                        </tr>
                    )}
                </tbody>
            </table>

            {/* Observações */}
            {solicitacao.observacoes_adicionais && (
                <table style={{ width: '100%', borderCollapse: 'collapse', marginBottom: '16px' }}>
                    <tbody>
                        <tr>
                            <td style={{
                                backgroundColor: '#004a80',
                                color: '#fff',
                                padding: '10px',
                                border: '1px solid #000',
                                fontWeight: 'bold'
                            }}>
                                OBSERVAÇÕES
                            </td>
                        </tr>
                        <tr>
                            <td style={{ border: '1px solid #000', padding: '10px' }}>
                                {solicitacao.observacoes_adicionais}
                            </td>
                        </tr>
                    </tbody>
                </table>
            )}

            {/* Data e Local */}
            <div style={{ textAlign: 'center', marginTop: '20px', fontStyle: 'italic' }}>
                Palmas - TO, {formatDataAtual()}
            </div>
        </div>
    );
}

// Componente para gerar o HTML da Ata
function AtaHTML({ solicitacao }) {
    const membros = solicitacao.membros_banca || [];

    const getTipoSessao = (tipo) => {
        const tipos = {
            'QUAL_DISS': 'Qualificação do projeto de pesquisa para dissertação',
            'DEF_DISS': 'Defesa de Dissertação',
            'QUAL_PROJ_TESE': 'Qualificação do Projeto de Tese',
            'DEF_TESE': 'Defesa de Tese',
            'QUAL_TESE': 'Qualificação de Tese',
        };
        return tipos[tipo] || tipo;
    };

    const getTipoGrau = (tipo) => {
        if (tipo?.includes('TESE')) return 'Doutor';
        return 'Mestre';
    };

    const formatDataExtenso = (data) => {
        if (!data) return '[DATA]';
        try {
            return format(new Date(data), "dd 'de' MMMM 'de' yyyy", { locale: ptBR });
        } catch {
            return data;
        }
    };

    // Formatar lista de membros da banca para o texto da ata
    const formatarMembros = () => {
        if (membros.length === 0) return '[MEMBROS DA BANCA]';

        return membros.map((m) => {
            const titulo = m.titulo || 'Prof.';
            const nome = m.nome || '';
            const ies = m.ies || '';
            const funcao = m.tipo_membro_display || m.tipo_membro || '';

            let descricao = `${titulo} ${nome}`;
            if (ies) descricao += ` (${ies})`;

            // Adicionar função específica
            if (funcao.toLowerCase().includes('orientador') && !funcao.toLowerCase().includes('coorientador')) {
                descricao += ' - orientador';
            } else if (funcao.toLowerCase().includes('coorientador')) {
                descricao += ' - coorientador';
            }

            return descricao;
        }).join(', ');
    };

    const tipoSessao = getTipoSessao(solicitacao.tipo_solicitacao);
    const grau = getTipoGrau(solicitacao.tipo_solicitacao);
    const dataFormatada = formatDataExtenso(solicitacao.data_proposta);
    const membrosFormatados = formatarMembros();

    return (
        <div style={{ width: '100%', fontFamily: 'Arial, sans-serif', fontSize: '12px', lineHeight: '1.6' }}>


            <div style={{ textAlign: 'justify', padding: '10px', marginBottom: '16px' }}>
                <p style={{ marginBottom: '16px' }}>
                    Ata da sessão pública de <strong>{tipoSessao}</strong> do Programa de Pós-Graduação em
                    Governança e Transformação Digital da UFT, do(a) discente
                    <strong> {solicitacao.pos_graduando_nome || '[NOME DO DISCENTE]'}</strong>, intitulada
                    "<strong>{solicitacao.titulo_projeto || '[TÍTULO DO PROJETO]'}</strong>",
                    número de registro SEI <strong>{solicitacao.numero_sei || '[NÚMERO SEI]'}</strong>,
                    como requisito parcial para a obtenção do grau de <strong>{grau}</strong> em Governança e Transformação Digital.
                </p>

                <p style={{ marginBottom: '16px' }}>
                    A sessão foi realizada dia <strong>{dataFormatada}</strong>, às <strong>{solicitacao.horario_proposto || '[HORÁRIO]'}</strong>,
                    {solicitacao.videoconferencia ? ' por videoconferência' : ` no local: ${solicitacao.local_proposto || '[LOCAL]'}`} e teve como
                    Comissão Avaliadora os seguintes membros: <strong>{membrosFormatados}</strong>.
                </p>

                <p style={{ marginBottom: '16px' }}>
                    Após o encerramento da sessão, a Comissão considerou a {tipoSessao.toLowerCase().includes('qualificação') ? 'qualificação' : 'defesa'}:
                </p>

                <p style={{ marginBottom: '16px' }}>
                    (x) Aprovada
                </p>
                <p style={{ marginBottom: '16px' }}>
                    ( ) Reprovada
                </p>

            </div>


        </div>
    );
}

export function CoordinationPendingPage() {
    const [solicitacoes, setSolicitacoes] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const { user } = useAuth();

    // Estados para Modais
    const [rejectionId, setRejectionId] = useState(null);
    const [rejectionReason, setRejectionReason] = useState('');
    const [actionLoading, setActionLoading] = useState(null); // ID da solicitação em loading (aprovar)
    const [savingId, setSavingId] = useState(null); // ID da solicitação salvando SEI
    const [numeroSeiInputs, setNumeroSeiInputs] = useState({}); // Objeto com numero_sei por ID
    const [showSeiInput, setShowSeiInput] = useState({}); // Controla quais cards mostram o input

    // Estado para Modal de Detalhes
    const [detailSolicitacao, setDetailSolicitacao] = useState(null);

    // Estado para Modal da Ata
    const [ataSolicitacao, setAtaSolicitacao] = useState(null);

    useEffect(() => {
        loadPendencias();
    }, []);

    const loadPendencias = async () => {
        setIsLoading(true);
        try {
            // Fetch both qualifications and defenses
            // Ideally backend should have a filter /api/v1/solicitacao-defesa?coordinationStatus=pendente
            // For now, filtering client side
            const response = await solicitacaoDefesaService.getSolicitacoesDefesa({ size: 100 });
            const lista = response.results || [];

            const pendentes = lista.filter(s => {
                // Check if it's waiting for coordination
                // This usually corresponds to step 4 (index 3) for Qualificacao 
                // but checking the status field is safer if it exists in the payload response
                // Since coordinationStatus might be inside a JSON field or just a field we haven't exposed in ListSerializer
                // Let's assume we need to fetch details or if ListSerializer exposes enough.
                // ListSerializer exposes: id, tipo_solicitacao, student_name, etc.
                // It does NOT expose coordinationStatus by default in the simplified list.
                // We might need to fetch details for each, or update backend ListSerializer.

                // Workaround: We will fetch details for candidate items or blindly list all recent ones
                // To be efficient, let's assume we filter by "current_step" if available or we just fetch all details for now (MVP).
                return true;
            });

            // Parallel fetch details to check status (inefficient but works for MVP)
            const detailsPromises = pendentes.map(s => solicitacaoDefesaService.getSolicitacaoDefesaById(s.id));
            const details = await Promise.all(detailsPromises);

            const reallyPending = details.filter(d =>
                d.coordinationStatus === 'pendente' ||
                (d.current_step === 3 && !d.coordinationStatus) // Fallback if field is missing initially
            );

            setSolicitacoes(reallyPending);
        } catch (error) {
            console.error('Erro ao carregar pendências:', error);
        } finally {
            setIsLoading(false);
        }
    };

    const handleAprovar = async (solicitacaoId) => {
        const numeroSei = numeroSeiInputs[solicitacaoId]?.trim();
        if (!numeroSei) {
            alert('Por favor, informe o número do processo SEI.');
            return;
        }
        setActionLoading(solicitacaoId);
        try {
            await solicitacaoDefesaService.patchSolicitacaoDefesa(solicitacaoId, {
                coordinationStatus: 'aprovado',
                coordinationDate: format(new Date(), 'yyyy-MM-dd'),
                coordinationNotes: 'Aprovado via Painel da Coordenação',
                numero_sei: numeroSei,
                current_step: 4
            });
            // Limpar o input após aprovação
            setNumeroSeiInputs(prev => {
                const updated = { ...prev };
                delete updated[solicitacaoId];
                return updated;
            });
            setShowSeiInput(prev => {
                const updated = { ...prev };
                delete updated[solicitacaoId];
                return updated;
            });
            loadPendencias();
        } catch (error) {
            console.error('Erro ao aprovar:', error);
            alert('Erro ao aprovar solicitação');
        } finally {
            setActionLoading(null);
        }
    };

    // Função para salvar apenas o número SEI sem aprovar
    const handleSalvarSei = async (solicitacaoId) => {
        const numeroSei = numeroSeiInputs[solicitacaoId]?.trim();
        if (!numeroSei) {
            alert('Por favor, informe o número do processo SEI.');
            return;
        }
        setSavingId(solicitacaoId);
        try {
            await solicitacaoDefesaService.patchSolicitacaoDefesa(solicitacaoId, {
                numero_sei: numeroSei
            });
            // Fechar o input após salvar
            setShowSeiInput(prev => {
                const updated = { ...prev };
                delete updated[solicitacaoId];
                return updated;
            });
            alert('Número SEI salvo com sucesso!');
        } catch (error) {
            console.error('Erro ao salvar Nº SEI:', error);
            alert('Erro ao salvar número SEI');
        } finally {
            setSavingId(null);
        }
    };

    const confirmRejeitar = async () => {
        if (!rejectionId) return;
        if (!rejectionReason.trim()) {
            alert('Por favor, informe o motivo da rejeição.');
            return;
        }

        setActionLoading(true);
        try {
            await solicitacaoDefesaService.patchSolicitacaoDefesa(rejectionId, {
                coordinationStatus: 'rejeitado',
                coordinationDate: format(new Date(), 'yyyy-MM-dd'),
                coordinationNotes: rejectionReason
            });
            setRejectionId(null);
            setRejectionReason('');
            loadPendencias();
        } catch (error) {
            console.error('Erro ao rejeitar:', error);
        } finally {
            setActionLoading(false);
        }
    };

    if (!isCoordinator(user)) {
        return <div className="p-8 text-center text-red-500">Acesso restrito à Coordenação.</div>;
    }

    return (
        <div className="p-6 max-w-7xl mx-auto space-y-6">
            <div className="flex justify-between items-center">
                <div>
                    <h1 className="text-2xl font-bold text-slate-900 dark:text-slate-100">
                        Pendências da Coordenação
                    </h1>
                    <p className="text-slate-600 dark:text-slate-400">
                        Solicitações aguardando análise
                    </p>
                </div>
                <Button variant="outline" onClick={loadPendencias} disabled={isLoading}>
                    Atualizar
                </Button>
            </div>

            {isLoading ? (
                <div className="flex justify-center p-12">
                    <Loader2 className="animate-spin h-8 w-8 text-brand-blue" />
                </div>
            ) : solicitacoes.length === 0 ? (
                <Card>
                    <CardContent className="flex flex-col items-center justify-center py-12 text-slate-500">
                        <CheckCircle className="h-12 w-12 mb-4 text-green-500" />
                        <p className="text-lg">Nenhuma pendência encontrada!</p>
                    </CardContent>
                </Card>
            ) : (
                <div className="grid gap-4 md:grid-cols-1">
                    {solicitacoes.map((s) => (
                        <Card key={s.id} className="hover:shadow-md transition-shadow">
                            <CardHeader className="pb-2">
                                <div className="flex justify-between items-start">
                                    <div>
                                        <div className="flex items-center gap-2 mb-1">
                                            <Badge variant={s.tipo_solicitacao === 'DEF_DISS' ? 'default' : 'secondary'}>
                                                {s.tipo_solicitacao_display}
                                            </Badge>
                                            <span className="text-xs text-slate-400">ID: {s.id}</span>
                                        </div>
                                        <CardTitle className="text-lg">{s.titulo_projeto || 'Sem título'}</CardTitle>
                                        <CardDescription>
                                            <span className="font-medium text-slate-700 dark:text-slate-300">{s.pos_graduando_nome}</span>
                                            {' • Orientador: '}{s.orientador_nome}
                                        </CardDescription>
                                    </div>
                                    <div className="text-right text-sm text-slate-500">
                                        <div className="flex items-center gap-1 justify-end">
                                            <Calendar className="h-3 w-3" />
                                            {s.data_proposta ? format(new Date(s.data_proposta), 'dd/MM/yyyy') : 'Data n/d'}
                                        </div>
                                        <div>{s.horario_proposto}</div>
                                    </div>
                                </div>
                            </CardHeader>
                            <CardContent>
                                <div className="bg-slate-50 dark:bg-slate-900 p-3 rounded-md mb-4 text-sm">
                                    <p className="font-semibold mb-1">Status Atual do Wizard: Passo {s.current_step + 1}</p>
                                    <p className="text-slate-600 dark:text-slate-400">
                                        {s.observacoes_adicionais || 'Sem observações adicionais.'}
                                    </p>
                                </div>

                                {/* Input do Número SEI - aparece ao clicar no botão */}
                                {showSeiInput[s.id] && (
                                    <div className="bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-700 rounded-md p-3 mb-4 animate-in fade-in slide-in-from-top-2">
                                        <Label htmlFor={`sei-${s.id}`} className="text-sm font-medium text-green-800 dark:text-green-200 mb-2 block">
                                            Número do Processo SEI <span className="text-red-500">*</span>
                                        </Label>
                                        <Input
                                            id={`sei-${s.id}`}
                                            placeholder="Ex: 23101.009504/2025-19"
                                            value={numeroSeiInputs[s.id] || ''}
                                            onChange={(e) => setNumeroSeiInputs(prev => ({ ...prev, [s.id]: e.target.value }))}
                                            className="bg-white dark:bg-slate-800"
                                            autoFocus
                                        />
                                        <p className="text-xs text-green-700 dark:text-green-300 mt-1">
                                            Informe o número do processo SEI para aprovar esta solicitação.
                                        </p>
                                    </div>
                                )}

                                <div className="flex justify-end gap-3 flex-wrap">
                                    <Button variant="outline" onClick={() => setDetailSolicitacao(s)}>
                                        <Eye className="w-4 h-4 mr-2" />
                                        Detalhe
                                    </Button>
                                    <Button variant="outline" onClick={() => setAtaSolicitacao(s)}>
                                        <ClipboardList className="w-4 h-4 mr-2" />
                                        Ata
                                    </Button>
                                    <Button variant="outline" className="text-red-600 hover:bg-red-50" onClick={() => setRejectionId(s.id)}>
                                        <XCircle className="w-4 h-4 mr-2" />
                                        Rejeitar
                                    </Button>

                                    {/* Botão para inserir Nº SEI / Salvar / Aprovar */}
                                    {!showSeiInput[s.id] ? (
                                        <Button
                                            className="bg-blue-600 hover:bg-blue-700"
                                            onClick={() => setShowSeiInput(prev => ({ ...prev, [s.id]: true }))}
                                        >
                                            <FileText className="w-4 h-4 mr-2" />
                                            Inserir Nº SEI
                                        </Button>
                                    ) : (
                                        <>
                                            <Button
                                                variant="outline"
                                                onClick={() => handleSalvarSei(s.id)}
                                                disabled={!numeroSeiInputs[s.id]?.trim() || savingId === s.id}
                                            >
                                                {savingId === s.id ? (
                                                    <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                                                ) : (
                                                    <FileText className="w-4 h-4 mr-2" />
                                                )}
                                                Salvar SEI
                                            </Button>
                                            <Button
                                                className="bg-green-600 hover:bg-green-700"
                                                onClick={() => handleAprovar(s.id)}
                                                disabled={!numeroSeiInputs[s.id]?.trim() || actionLoading === s.id}
                                            >
                                                {actionLoading === s.id ? (
                                                    <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                                                ) : (
                                                    <CheckCircle className="w-4 h-4 mr-2" />
                                                )}
                                                Aprovar e Liberar
                                            </Button>
                                        </>
                                    )}
                                </div>
                            </CardContent>
                        </Card>
                    ))}
                </div>
            )}



            {/* Modal de Rejeição */}
            <Dialog open={!!rejectionId} onOpenChange={(open) => !open && setRejectionId(null)}>
                <DialogContent>
                    <DialogHeader>
                        <DialogTitle className="flex items-center gap-2">
                            <XCircle className="text-red-600 h-5 w-5" />
                            Rejeitar Solicitação
                        </DialogTitle>
                        <DialogDescription>
                            Informe o motivo da rejeição para notificar o aluno.
                        </DialogDescription>
                    </DialogHeader>
                    <div className="py-4">
                        <Label htmlFor="reason" className="mb-2 block">Motivo da Rejeição</Label>
                        <Textarea
                            id="reason"
                            placeholder="Descreva o motivo..."
                            value={rejectionReason}
                            onChange={(e) => setRejectionReason(e.target.value)}
                            rows={4}
                        />
                    </div>
                    <DialogFooter>
                        <Button variant="outline" onClick={() => setRejectionId(null)}>Cancelar</Button>
                        <Button
                            variant="destructive"
                            onClick={confirmRejeitar}
                            disabled={actionLoading || !rejectionReason.trim()}
                        >
                            {actionLoading ? <Loader2 className="h-4 w-4 animate-spin mr-2" /> : null}
                            Rejeitar Solicitação
                        </Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>

            {/* Modal de Detalhes */}
            <Dialog open={!!detailSolicitacao} onOpenChange={(open) => !open && setDetailSolicitacao(null)}>
                <DialogContent className="max-w-4xl max-h-[90vh] overflow-hidden">
                    <DialogHeader>
                        <DialogTitle className="flex items-center gap-2">
                            <FileText className="text-brand-blue h-5 w-5" />
                            Detalhes da Solicitação
                        </DialogTitle>
                        <DialogDescription>
                            Visualização completa do formulário de solicitação
                        </DialogDescription>
                    </DialogHeader>
                    <div id="detail-form-content" className="max-h-[65vh] overflow-y-auto pr-4">
                        {detailSolicitacao && <DetailFormHTML solicitacao={detailSolicitacao} />}
                    </div>
                    <DialogFooter className="gap-2">
                        <Button
                            variant="outline"
                            onClick={async () => {
                                const detailContainer = document.getElementById('detail-form-content');
                                if (detailContainer) {
                                    try {
                                        const htmlContent = detailContainer.innerHTML;
                                        const blob = new Blob([htmlContent], { type: 'text/html' });
                                        const clipboardItem = new ClipboardItem({ 'text/html': blob });
                                        await navigator.clipboard.write([clipboardItem]);

                                        const btn = document.getElementById('copy-btn');
                                        if (btn) {
                                            btn.innerHTML = '<svg class="w-4 h-4 mr-2" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 6 9 17 4 12"></polyline></svg>Copiado!';
                                            setTimeout(() => {
                                                btn.innerHTML = '<svg class="w-4 h-4 mr-2" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="9" y="9" width="13" height="13" rx="2" ry="2"></rect><path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"></path></svg>Copiar HTML';
                                            }, 2000);
                                        }
                                    } catch (err) {
                                        console.error('Erro ao copiar:', err);
                                    }
                                }
                            }}
                            id="copy-btn"
                        >
                            <Copy className="w-4 h-4 mr-2" />
                            Copiar HTML
                        </Button>
                        <Button variant="outline" onClick={() => setDetailSolicitacao(null)}>
                            Fechar
                        </Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>

            {/* Modal da Ata */}
            <Dialog open={!!ataSolicitacao} onOpenChange={(open) => !open && setAtaSolicitacao(null)}>
                <DialogContent className="max-w-4xl max-h-[90vh] overflow-hidden">
                    <DialogHeader>
                        <DialogTitle className="flex items-center gap-2">
                            <ClipboardList className="text-brand-blue h-5 w-5" />
                            Ata da Sessão Pública
                        </DialogTitle>
                        <DialogDescription>
                            Ata gerada automaticamente com base nos dados da solicitação
                        </DialogDescription>
                    </DialogHeader>
                    <div id="ata-form-content" className="max-h-[65vh] overflow-y-auto pr-4">
                        {ataSolicitacao && <AtaHTML solicitacao={ataSolicitacao} />}
                    </div>
                    <DialogFooter className="gap-2">
                        <Button
                            variant="outline"
                            onClick={async () => {
                                const ataContainer = document.getElementById('ata-form-content');
                                if (ataContainer) {
                                    try {
                                        const htmlContent = ataContainer.innerHTML;
                                        const blob = new Blob([htmlContent], { type: 'text/html' });
                                        const clipboardItem = new ClipboardItem({ 'text/html': blob });
                                        await navigator.clipboard.write([clipboardItem]);

                                        const btn = document.getElementById('copy-ata-btn');
                                        if (btn) {
                                            btn.innerHTML = '<svg class="w-4 h-4 mr-2" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 6 9 17 4 12"></polyline></svg>Copiado!';
                                            setTimeout(() => {
                                                btn.innerHTML = '<svg class="w-4 h-4 mr-2" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="9" y="9" width="13" height="13" rx="2" ry="2"></rect><path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"></path></svg>Copiar HTML';
                                            }, 2000);
                                        }
                                    } catch (err) {
                                        console.error('Erro ao copiar:', err);
                                    }
                                }
                            }}
                            id="copy-ata-btn"
                        >
                            <Copy className="w-4 h-4 mr-2" />
                            Copiar HTML
                        </Button>
                        <Button variant="outline" onClick={() => setAtaSolicitacao(null)}>
                            Fechar
                        </Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>
        </div>
    );
}

