export function contentMedicamentoP(item) {
    return {
        objeto: item,
        cantidadTotal: (item.CantTotalF !== null ? Number(item.CantTotalF) : 0),
        type: 'medicamento',
        TipoTec: 'M',
        title: item.DescMedPrinAct,
        subTitle: item.estado_junta,
        classSubTitle: [2,4].find(x => x === item.EstJM) ? 'red--text' : 'green--text',
        cantidadFormulada: (item.CantTotalF !== null ? item.CantTotalF + (item.presentacion ? ' ' + item.presentacion.descripcion : '') : ''),
        table: [
            {label: 'Descripción', text: item.DescMedPrinAct},
            {label: 'Tipo medicamento', text: item.tipo_medicamento},
            {label: 'Tipo prestación', text: item.tipo_prestador},
            {
                label: 'Forma farmacéutica',
                text: item.forma_farmaceutica ? item.forma_farmaceutica.codigo + ' - ' + item.forma_farmaceutica.descripcion : ''
            },
            {
                label: 'Cantidad formulada',
                text: item.CantTotalF !== null ? item.CantTotalF + (item.presentacion ? ' ' + item.presentacion.descripcion : '') : ''
            },
            {
                label: 'Vía administración',
                text: item.via_administracion ? item.via_administracion.descripcion : ''
            },
            {
                label: 'Tratamiento',
                text: item.Dosis + (item.unidad_medida_dosis ? ' ' + item.unidad_medida_dosis.descripcion : '') + (item.NoFAdmon ? ' cada ' + item.NoFAdmon + (item.frecuencia_administracion ? ' ' + item.frecuencia_administracion : '') : '') + (item.CanTrat ? ' por ' + item.CanTrat + (item.duracion_tratamiento ? ' ' + item.duracion_tratamiento : '') : '')
            }
        ],
        list: [
            {title: 'Justificación no PBS', text: item.JustNoPBS},
            {title: 'Indicaciones especiales', text: item.indicaciones_especiales},
            {title: 'Indicaciones o recomendaciones para el paciente', text: item.IndRec},
            {title: 'Principios Activos', text: item.principios_activos ? item.principios_activos.map(x => { return `<strong>${x.principio_activo ? x.principio_activo.descripcion : 'NO REGISTRA DESCRIPCIÓN'}</strong> ${x.ConcCant}${x.unimedida_concentracion.descripcion2}/${x.CantCont}${x.unimedida_medicamento.descripcion2}`}).join('; ') : ''}
        ],
        causasRazones: [
            {
                label: 'Causa Solicitud 1 ¿El medicamento está financiado por el Plan de Beneficios en Salud con cargo a la UPC?',
                text: item.CausaS1,
                classTdItem: ''
            },
            {
                label: 'Causa Solicitud 2 ¿El medicamento se encuentra en fase experimental?',
                text: item.CausaS2,
                classTdItem: ''
            },
            {
                label: 'Causa Solicitud 3 ¿Ya utilizó los medicamentos existentes en el Plan de Beneficios en Salud con cargo a la UPC?',
                text: item.CausaS3,
                classTdItem: ''
            },
            {label: 'Medicamento PBS Utilizado', text: item.MedPBSUtilizado, classTdItem: ''},
            {
                label: 'Razón Causa Solicitud 3.1 - Resultados clínicos no satisfactorios ¿Lo utilizó y no se obtuvieron resultados clínicos o paraclínicos satisfactorios en el término previsto de sus indicaciones?',
                text: (item.RznCausaS31 === 1 ? 'SI' : item.RznCausaS31 === 0 ? 'NO' : item.RznCausaS31) + (item.DescRzn31 ? ': ' + item.DescRzn31 : ''),
                classTdItem: 'pl-10'
            },
            {
                label: 'Razón Causa Solicitud 3.2 - Reacciones adversas o intolerancia ¿Lo utilizó y se observaron reacciones adversas o intolerancia por el paciente?',
                text: (item.RznCausaS32 === 1 ? 'SI' : item.RznCausaS32 === 0 ? 'NO' : item.RznCausaS32) + (item.DescRzn32 ? ': ' + item.DescRzn32 : ''),
                classTdItem: 'pl-10'
            },
            {
                label: 'Causa Solicitud 4 ¿Ya descartó los medicamentos existentes en el Plan de Beneficios en Salud con cargo a la UPC?',
                text: item.CausaS4,
                classTdItem: ''
            },
            {label: 'Medicamento PBS Descartado', text: item.MedPBSDescartado, classTdItem: ''},
            {
                label: 'Razón Causa Solicitud 4.1 - Reacciones adversas o intolerancia ¿Lo descartó porque se prevén reacciones adversas o intolerancia por el paciente?',
                text: (item.RznCausaS41 === 1 ? 'SI' : item.RznCausaS41 === 0 ? 'NO' : item.RznCausaS41) + (item.DescRzn41 ? ': ' + item.DescRzn41 : ''),
                classTdItem: 'pl-10'
            },
            {
                label: 'Razón Causa Solicitud 4.2 - Indicaciones/Contraindicaciones ¿Lo descartó porque existen indicaciones o contraindicaciones expresas?',
                text: (item.RznCausaS42 === 1 ? 'SI' : item.RznCausaS42 === 0 ? 'NO' : item.RznCausaS42) + (item.DescRzn42 ? ': ' + item.DescRzn42 : ''),
                classTdItem: 'pl-10'
            },
            {
                label: 'Razón Causa Solicitud 4.3 - No existe  alternativa ¿Lo descartó porque no existe otra alternativa en el PBS?',
                text: (item.RznCausaS43 === 1 ? 'SI' : item.RznCausaS43 === 0 ? 'NO' : item.RznCausaS43) + (item.DescRzn43 ? ': ' + item.DescRzn43 : ''),
                classTdItem: 'pl-10'
            },
            {
                label: 'Razón Causa Solicitud 4.4 - Evidencia  científica   disponible ¿Lo descartó porque tiene mejor evidencia científica disponible sobre seguridad, eficacia y efectividad clínica?',
                text: (item.RznCausaS44 === 1 ? 'SI' : item.RznCausaS44 === 0 ? 'NO' : item.RznCausaS44) + (item.DescRzn44 ? ': ' + item.DescRzn44 : ''),
                classTdItem: 'pl-10'
            },
            {
                label: 'Causa Solicitud 5 ¿La indicación o uso previsto del medicamento está registrado/aprobado por el competente?',
                text: item.CausaS5,
                classTdItem: ''
            },
            {
                label: 'Razón Causa Solicitud 5 - ¿El medicamento aparece en la lista de uso No Indicado en el Registro Sanitario - UNIRS?',
                text: (item.RznCausaS5 === 1 ? 'SI' : item.RznCausaS5 === 0 ? 'NO' : item.RznCausaS5),
                classTdItem: 'pl-10'
            },
            {
                label: 'Causa Solicitud 6 ¿Existe evidencia científica disponible sobre seguridad, eficacia y efectividad clínica?',
                text: item.CausaS6,
                classTdItem: ''
            }
        ]
    }
}

export function contentComplementarioP(item) {
    return {
        objeto: item,
        cantidadTotal: (item.CantTotal !== null ? Number(item.CantTotal) : 0),
        type: 'servicio complementario',
        TipoTec: 'S',
        title: (item.CodSerComp ? item.CodSerComp : '') + (item.DescSerComp ? ' | ' + item.DescSerComp : ''),
        subTitle: `${item.EstadoJunta}`,
        classSubTitle: [2,4].find(x => x === item.EstJM) ? 'red--text' : 'green--text',
        cantidadFormulada: (item.CantTotal !== null ? item.CantTotal : ''),
        table: [
            {label: 'Descripción', text: (item.CodSerComp ? item.CodSerComp : '') + (item.DescSerComp ? ' | ' + item.DescSerComp : '')},
            {label: 'Tipo prestación', text: item.TipoPrestador},
            {label: 'Cantidad formulada', text: (item.CantTotal !== null ? item.CantTotal : '')},
            {
                label: 'Tratamiento',
                text: item.CanForm + (item.CadaFreUso ? ' cada ' + item.CadaFreUso + (item.FrecuenciaUso ? ' ' + item.FrecuenciaUso : '') : '') + (item.Cant ? ' por ' + item.Cant + (item.DuracionTratamiento ? ' ' + item.DuracionTratamiento : '') : '')
            }
        ],
        list: [
            {title: 'Justificación no PBS', text: item.JustNoPBS},
            {title: 'Indicaciones o recomendaciones para el paciente', text: item.IndRec}
        ],
        causasRazones: [
            {
                label: 'Código Causa Solicitud 1 ¿El uso del servicio es cosmético o suntuario?',
                text: item.CausaS1,
                classTdItem: ''
            },
            {
                label: 'Código Causa Solicitud 2 ¿El servicio se prestará en Colombia?',
                text: item.CausaS2,
                classTdItem: ''
            },
            {
                label: 'Código Causa Solicitud 4 ¿El servicio corresponde a la condición clínica y diagnóstico del paciente?',
                text: (item.CausaS4 === 1 ? 'SI' : item.CausaS4 === 0 ? 'NO' : item.CausaS4) + (item.DescCausaS4 ? ': ' + item.DescCausaS4 : ''),
                classTdItem: 'pl-10'
            }
        ]
    }
}

export function contentNutricionalP(item) {
    return {
        objeto: item,
        cantidadTotal: (item.CantTotalF !== null ? Number(item.CantTotalF) : 0),
        type: 'producto nutricional',
        TipoTec: 'N',
        title: item.producto ? item.producto.codigo + ' | ' + [item.producto.nombre_comercial, item.producto.descripcion].filter(x => x).join(' - ') + ` ${item.producto.presentacion_comercial}${item.producto.unidades}` : '',
        subTitle: `${item.EstadoJunta}`,
        classSubTitle: [2,4].find(x => x === item.EstJM) ? 'red--text' : 'green--text',
        cantidadFormulada: (item.CantTotalF !== null ? item.CantTotalF + (item.forma_cantidad_total ? ' ' + item.forma_cantidad_total.descripcion : '') : ''),
        table: [
            {
                label: 'Descripción',
                text: item.producto ? item.producto.codigo + ' | ' + [item.producto.nombre_comercial, item.producto.descripcion].filter(x => x).join(' - ') + ` ${item.producto.presentacion_comercial}${item.producto.unidades}` : ''
            },
            {
                label: 'Tipo producto',
                text: item.tipo ? item.tipo.descripcion : ''
            },
            {label: 'Tipo prestación', text: item.tipo_prestador},
            {
                label: 'Forma',
                text: item.forma ? item.forma.descripcion : ''
            },
            {
                label: 'Cantidad formulada',
                text: item.CantTotalF !== null ? item.CantTotalF + (item.forma_cantidad_total ? ' ' + item.forma_cantidad_total.descripcion : '') : ''
            },
            {
                label: 'Vía administración',
                text: item.via_administracion
            },
            {
                label: 'Tratamiento',
                text: item.Dosis + (item.unidad_medida_dosis ? ' ' + item.unidad_medida_dosis.descripcion : '') + (item.NoFAdmon ? ' cada ' + item.NoFAdmon + (item.frecuencia_administracion ? ' ' + item.frecuencia_administracion : '') : '') + (item.CanTrat ? ' por ' + item.CanTrat + (item.duracion_tratamiento ? ' ' + item.duracion_tratamiento : '') : '')
            }
        ],
        list: [
            {title: 'Número de prescripción asociada', text: item.NoPrescAso, visible: item.NoPrescAso !== null},
            {title: 'Justificación no PBS', text: item.JustNoPBS},
            {title: 'Indicaciones especiales', text: item.indicaciones_especiales},
            {title: 'Indicaciones o recomendaciones para el paciente', text: item.IndRec}
        ],
        causasRazones: [
            {
                label: 'Código Causa Solicitud 2 ¿El Producto de Soporte Nutricional está registrado por el INVIMA?',
                text: item.CausaS2,
                classTdItem: ''
            },
            {
                label: 'Diagnóstico de Enfermedad Huérfana, Enfermedad rara, Ultra-Huérfana y Olvidada',
                text: item.DxEnfermedadHuerfana,
                classTdItem: ''
            },
            {label: 'Diagnóstico de VIH', text: item.DxVIH, classTdItem: ''},
            {label: 'Diagnóstico de Cáncer en cuidado paliativo', text: item.DxCancerPaliativo, classTdItem: ''},
            {
                label: 'Diagnóstico de Enfermedad Renal Crónica Estadio V',
                text: item.DxEnfermedadRenalCronica,
                classTdItem: ''
            },
            {
                label: 'Diagnóstico Desnutrición Proteicocalórica en menores de 5 años5',
                text: item.DxDesnutricionProteicocalorica,
                classTdItem: ''
            }
        ]
    }
}

export function contentProcedimientoP(item) {
    return {
        objeto: item,
        cantidadTotal: (item.CantTotal !== null ? Number(item.CantTotal) : 0),
        type: 'procedimiento',
        TipoTec: 'P',
        title: item.cup ? item.cup.codigo + ' | ' + item.cup.descripcion : '',
        subTitle: `${item.estado_junta}`,
        classSubTitle: [2,4].find(x => x === item.EstJM) ? 'red--text' : 'green--text',
        cantidadFormulada: (item.CantTotal !== null ? item.CantTotal : ''),
        table: [
            {label: 'Descripción', text: item.cup ? item.cup.codigo + ' | ' + item.cup.descripcion : ''},
            {label: 'Tipo prestación', text: item.tipo_prestacion},
            {label: 'Cantidad formulada', text: item.CantTotal !== null ? item.CantTotal : ''},
            {
                label: 'Tratamiento',
                text: item.CanForm + (item.CadaFreUso ? ' cada ' + item.CadaFreUso + (item.periodo_frecuencia_uso ? ' ' + item.periodo_frecuencia_uso : '') : '') + (item.Cant ? ' por ' + item.Cant + (item.periodo_duracion_tratamiento ? ' ' + item.periodo_duracion_tratamiento : '') : '')
            }
        ],
        list: [
            {title: 'Justificación no PBS', text: item.JustNoPBS},
            {title: 'Indicaciones o recomendaciones para el paciente', text: item.IndRec}
        ],
        causasRazones: [
            {label: 'Código Causa Solicitud 1.1 ¿Tiene CUPS?', text: item.CausaS11, classTdItem: ''},
            {
                label: 'Código Causa Solicitud 1.2 ¿Es una combinación de CUPS?',
                text: item.CausaS12,
                hint: '',
                icon: null
            },
            {
                label: 'Código Causa Solicitud 3 ¿El Procedimiento se encuentra financiado con recursos de la UPC?',
                text: item.CausaS3,
                classTdItem: ''
            },
            {
                label: 'Código Causa Solicitud 4 ¿Utilizó lo existente en el Plan de Beneficios en Salud con cargo a la UPC?',
                text: item.CausaS4,
                classTdItem: ''
            },
            {
                label: 'Procedimiento PBS Utilizado',
                text: (item.ProPBSUtilizado ? item.ProPBSUtilizado + ' - ' : '') + (item.procedimiento_utilizado ? item.procedimiento_utilizado.descripcion : 'El procedimiento no se encuentra registrado en la tabla de CUPS.'),
                classTdItem: ''
            },
            {
                label: 'Código Causa Solicitud 5 ¿Descartó lo existente en el Plan de Beneficios en Salud con cargo a la UPC?',
                text: item.CausaS5,
                classTdItem: ''
            },
            {
                label: 'Procedimiento PBS Descartado',
                text: (item.ProPBSDescartado ? item.ProPBSDescartado + ' - ' : '') + (item.procedimiento_descartado ? item.procedimiento_descartado.descripcion : 'El procedimiento no se encuentra registrado en la tabla de CUPS.'),
                classTdItem: ''
            },
            {
                label: 'Código Razón 5.1 - No existe alternativa ¿Lo descartó porque no existe alternativa en el PBS?',
                text: (item.RznCausaS51 === 1 ? 'SI' : item.RznCausaS51 === 0 ? 'NO' : item.RznCausaS51) + (item.DescRzn51 ? ': ' + item.DescRzn51 : ''),
                classTdItem: 'pl-10'
            },
            {
                label: 'Código Razón 5.2 - Evidencia científica disponible ¿Lo descartó porque tiene mejor evidencia científica disponible sobre seguridad, eficacia y efectividad clínica?',
                text: (item.RznCausaS52 === 1 ? 'SI' : item.RznCausaS52 === 0 ? 'NO' : item.RznCausaS52) + (item.DescRzn52 ? ': ' + item.DescRzn52 : ''),
                classTdItem: 'pl-10'
            }
        ]
    }
}

export function contentDispositivoP(item) {
    return {
        objeto: item,
        cantidadTotal: (item.CantTotal !== null ? Number(item.CantTotal) : 0),
        type: 'dispositivo médico',
        TipoTec: 'D',
        title: item.dispositivo ? item.dispositivo.codigo + ' | ' + item.dispositivo.descripcion : '',
        subTitle: `${item.EstadoJunta}`,
        classSubTitle: [2,4].find(x => x === item.EstJM) ? 'red--text' : 'green--text',
        cantidadFormulada: (item.CantTotal !== null ? item.CantTotal : ''),
        table: [
            {label: 'Descripción', text: item.dispositivo ? item.dispositivo.codigo + ' | ' + item.dispositivo.descripcion : ''},
            {label: 'Tipo prestación', text: item.tipo_prestador},
            {label: 'Cantidad formulada', text: item.CantTotal !== null ? item.CantTotal : ''},
            {
                label: 'Tratamiento',
                text: item.CanForm + (item.CadaFreUso ? ' cada ' + item.CadaFreUso + (item.frecuencia_uso ? ' ' + item.frecuencia_uso : '') : '') + (item.Cant ? ' por ' + item.Cant + (item.periodo_duracion_tratamiento ? ' ' + item.periodo_duracion_tratamiento : '') : '')
            }
        ],
        list: [
            {title: 'Justificación no PBS', text: item.JustNoPBS},
            {title: 'Indicaciones o recomendaciones para el paciente', text: item.IndRec}
        ],
        causasRazones: [
            {
                label: 'Código Causa Solicitud 1 ¿Agotó la cobertura del plan de beneficios en salud financiado con recursos de la UPC?',
                text: item.CausaS1,
                classTdItem: ''
            }
        ]
    }
}