import { css, html, TemplateResult } from 'lit';



import { BaseEditor } from './base-editor';

import { translate } from '../localization/i18n';



type ColorField = 'crmBackground' | 'crmAccent' | 'crmText' | 'crmIconColor';

type ThemeMode = 'auto' | 'light' | 'dark' | 'custom';



class DesignEditor extends BaseEditor {

  private readonly defaults = {

    crmBackground: '#101b19',

    crmAccent: '#34d399',

    crmText: '#f0fdf4',

    crmIconColor: '#183329',

    crmBorderRadius: '20px',

  };



  private setField(name: string, value: string): void {

    this.configChanged({ ...this.config, [name]: value });

  }



  private setTheme(mode: ThemeMode): void {

    this.setField('crmTheme', mode);

  }



  private onTextChange(event: Event): void {

    const input = event.currentTarget as HTMLInputElement;

    this.setField(input.name, input.value);

  }



  private onColorChange(event: Event): void {

    const input = event.currentTarget as HTMLInputElement;

    this.setField(input.name, input.value);

  }



  private resetField(name: keyof DesignEditor['defaults']): void {

    this.setField(name, this.defaults[name]);

  }



  private getValue(name: keyof DesignEditor['defaults']): string {

    const value = this.config[name];

    return value == null ? this.defaults[name] : String(value);

  }



  private getTheme(): ThemeMode {

    const configured = (this.config as typeof this.config & { crmTheme?: string }).crmTheme;

    return configured === 'light' || configured === 'dark' ||

      configured === 'auto' || configured === 'custom'

      ? configured

      : 'dark';

  }



  private contrastInk(background: string): string {
    const hex = background.trim().match(/^#([0-9a-f]{6})$/i);
    if (!hex) return '#ffffff';
    const n = hex[1];
    const rgb = [0, 2, 4].map(i => parseInt(n.slice(i, i + 2), 16) / 255);
    const linear = rgb.map(c => c <= 0.04045 ? c / 12.92 : ((c + 0.055) / 1.055) ** 2.4);
    const luminance = linear[0] * 0.2126 + linear[1] * 0.7152 + linear[2] * 0.0722;
    return luminance > 0.179 ? '#101b19' : '#ffffff';
  }

  private colorControl(name: ColorField, label: string, resetLabel: string): TemplateResult {

    const value = this.getValue(name);

    const isHex = /^#[0-9a-fA-F]{6}$/.test(value);

    return html`

      <div class="color-row">

        <div class="color-top">

          <span class="field-label">${label}</span>

          <button class="reset" type="button" @click=${() => this.resetField(name)}>${resetLabel}</button>

        </div>

        <div class="color-controls">

          <label class="color-picker" title=${label}>

            <input

              type="color"

              name=${name}

              aria-label=${label}

              .value=${isHex ? value : this.defaults[name]}

              @input=${this.onColorChange}

            />

          </label>

          <input

            class="studio-input color-text"

            type="text"

            name=${name}

            aria-label=${label}

            spellcheck="false"

            .value=${value}

            @change=${this.onTextChange}

          />

        </div>

      </div>

    `;

  }



  private themeChoice(mode: ThemeMode, title: string, description: string, selected: ThemeMode): TemplateResult {

    const active = selected === mode;

    return html`

      <button

        type="button"

        class="theme-option ${active ? 'selected' : ''}"

        aria-pressed=${String(active)}

        @click=${() => this.setTheme(mode)}

      >

        <span class="theme-thumbnail ${mode}" aria-hidden="true">

          <span class="thumbnail-paper"><span class="thumbnail-aa">Aa</span><span class="thumbnail-line"></span></span>

        </span>

        <span class="theme-copy"><strong>${title}</strong><small>${description}</small></span>

        <span class="theme-indicator" aria-hidden="true">${active ? html`<ha-icon icon="mdi:check"></ha-icon>` : ''}</span>

      </button>

    `;

  }



  protected render(): TemplateResult {

    super.createStore();



    const language = this.config.language ?? 'auto';

    const t = (key: string): string =>

      translate(`editor.designSettings.${key}`, language, this.hass.language);



    const lang = (language === 'auto' ? this.hass.language : language).toLowerCase();

    const pt = lang.startsWith('pt');

    const de = lang.startsWith('de');

    const ui = {

      appearance: pt ? 'Aparência' : de ? 'Erscheinungsbild' : 'Appearance',

      appearanceHint: pt ? 'Escolha como o cartão deve aparecer' : de ? 'Wähle das Design der Karte' : 'Choose how the card looks',

      light: pt ? 'Claro' : de ? 'Hell' : 'Light',

      lightHint: pt ? 'Sempre no modo claro' : de ? 'Immer im hellen Design' : 'Always use light mode',

      dark: pt ? 'Escuro' : de ? 'Dunkel' : 'Dark',

      darkHint: pt ? 'Sempre no modo escuro' : de ? 'Immer im dunklen Design' : 'Always use dark mode',

      auto: pt ? 'Automático' : de ? 'Automatisch' : 'Automatic',

      autoHint: pt ? 'Segue o tema do Home Assistant' : de ? 'Folgt dem Home Assistant-Design' : 'Follow the Home Assistant theme',

      custom: pt ? 'Personalizado' : de ? 'Benutzerdefiniert' : 'Custom',

      customHint: pt ? 'Escolha suas próprias cores' : de ? 'Eigene Farben auswählen' : 'Choose your own colors',

      colors: pt ? 'Paleta de cores' : de ? 'Farbpalette' : 'Color palette',

      colorsHint: pt ? 'Personalize a identidade visual do cartão' : de ? 'Passe die Farben deiner Karte an' : 'Customize the card colors',

      iconColor: pt ? 'Cor dos ícones' : de ? 'Symbolfarbe' : 'Icon color',

      iconAuto: pt ? 'Automática' : de ? 'Automatisch' : 'Automatic',

      iconCustom: pt ? 'Personalizada' : de ? 'Benutzerdefiniert' : 'Custom',

      dimensions: pt ? 'Dimensões personalizadas' : de ? 'Benutzerdefinierte Abmessungen' : 'Custom dimensions',

      width: pt ? 'Largura' : de ? 'Breite' : 'Width',

      height: pt ? 'Altura' : de ? 'Höhe' : 'Height',

      dimensionsHint: pt ? 'Deixe vazio para usar o tamanho padrão.' : de ? 'Leer lassen, um die Standardgröße zu verwenden.' : 'Leave empty to use the default size.',

      heightTitle: pt ? 'Altura do cartão' : de ? 'Kartenhöhe' : 'Card height',

      heightHint: pt ? 'Escolha como o cartão ocupa o espaço vertical' : de ? 'Lege fest, wie die Karte den vertikalen Platz nutzt' : 'Choose how the card uses vertical space',

      compact: pt ? 'Compacto' : de ? 'Kompakt' : 'Compact',

      compactHint: pt ? 'Menor altura, com rolagem interna' : de ? 'Kleine Höhe mit internem Scrollen' : 'Short height with internal scrolling',

      automatic: pt ? 'Automático' : de ? 'Automatisch' : 'Automatic',

      automaticHint: pt ? 'Cresce conforme o conteúdo' : de ? 'Wächst mit dem Inhalt' : 'Grows with the content',

      fill: pt ? 'Preencher' : de ? 'Ausfüllen' : 'Fill',

      fillHint: pt ? 'Ocupa a altura disponível' : de ? 'Nutzt die verfügbare Höhe' : 'Uses the available height',

      shape: pt ? 'Formato' : de ? 'Form' : 'Shape',

      preview: pt ? 'Prévia das cores' : de ? 'Farbvorschau' : 'Color preview',

      previewTitle: pt ? 'Minha música' : de ? 'Meine Musik' : 'My music',

      previewSubtitle: pt ? 'Pronto para tocar' : de ? 'Bereit für Musik' : 'Ready to play',

      reset: pt ? 'Restaurar' : de ? 'Zurücksetzen' : 'Reset',

      radiusHint: pt ? 'Arraste para ajustar ou digite um valor CSS, como 1rem.' : de ? 'Mit dem Regler anpassen oder einen CSS-Wert wie 1rem eingeben.' : 'Use the slider or enter a CSS value such as 1rem.',

      radiusSoft: pt ? 'Suave' : de ? 'Weich' : 'Soft',

      radiusSquare: pt ? 'Reto' : de ? 'Eckig' : 'Square',

      customUnit: pt ? 'Valor personalizado' : de ? 'Benutzerdefinierter Wert' : 'Custom value',

      dimensionStatus: pt ? 'Tamanho definido manualmente' : de ? 'Manuell festgelegte Größe' : 'Manually defined size',

      dimensionDefault: pt ? 'Tamanho padrão' : de ? 'Standardgröße' : 'Default size',

    };



    const radius = this.getValue('crmBorderRadius');

    const radiusPixels = /^\s*(\d+(?:\.\d+)?)px\s*$/i.exec(radius);

    const radiusSliderValue = radiusPixels ? Math.min(48, Math.max(0, Number(radiusPixels[1]))) : 20;

    const hasCustomRadiusUnit = !radiusPixels;

    const widthValue = String(this.config.width ?? '');

    const heightValue = String(this.config.height ?? '');

    const selected = this.getTheme();





    const haDark = this.hass?.themes?.darkMode !== false;

    const useDark = selected === 'dark' ||

      (selected === 'auto' && haDark);



    const palette = useDark

      ? {

          background: '#101b19',

          accent: '#34d399',

          text: '#f0fdf4',

        }

      : {

          background: '#f7faf8',

          accent: '#16875c',

          text: '#183329',

        };



    const background = selected === 'custom'

      ? this.getValue('crmBackground')

      : palette.background;



    const accent = selected === 'custom'

      ? this.getValue('crmAccent')

      : palette.accent;



    const text = selected === 'custom'

      ? this.getValue('crmText')

      : palette.text;



    return html`

      <div class="studio">

        <div class="studio-heading">

          <span class="studio-kicker">CONTROLROOM STUDIO</span>

          <h3>${t('description')}</h3>

        </div>



        <div class="studio-panel">

          <div class="panel-title">${ui.appearance}</div>

          <div class="panel-hint">${ui.appearanceHint}</div>

          <div class="theme-list" role="group" aria-label=${ui.appearance}>

            ${this.themeChoice('light', ui.light, ui.lightHint, selected)}

            ${this.themeChoice('dark', ui.dark, ui.darkHint, selected)}

            ${this.themeChoice('auto', ui.auto, ui.autoHint, selected)}

            ${this.themeChoice('custom', ui.custom, ui.customHint, selected)}

          </div>

        </div>



        <div class="studio-panel">

          <div class="panel-title">${ui.heightTitle}</div>

          <div class="height-mode-visual">

            ${([

              ['compact', ui.compact],

              ['auto', ui.automatic],

              ['fill', ui.fill],

            ] as const).map(([mode, label]) => html`

              <button

                type="button"

                class="height-visual-option ${(

                  this.config.heightMode ??

                  (this.config.height === 'fill' ? 'fill' : 'compact')

                ) === mode ? 'selected' : ''}"

                aria-pressed=${String((

                  this.config.heightMode ??

                  (this.config.height === 'fill' ? 'fill' : 'compact')

                ) === mode)}

                @click=${() => this.configChanged({

                  ...this.config,

                  heightMode: mode,

                })}

              >

                <span class="height-visual-art ${mode}">

                  ${mode === 'compact' ? html`

                    <span class="art-row accent"></span>

                    <span class="art-row"></span>

                    <span class="art-line"></span>

                  ` : mode === 'auto' ? html`

                    <span class="art-row"></span>

                    <span class="art-row"></span>

                    <span class="art-row"></span>

                  ` : html`

                    <span class="art-fill">

                      <ha-icon icon="mdi:arrow-expand-vertical"></ha-icon>

                    </span>

                  `}

                </span>

                <span class="height-visual-label">${label}</span>

              </button>

            `)}

          </div>

        </div>



        <div class="studio-panel dimensions-panel">

          <div class="panel-title">${ui.dimensions}</div>

          <div class="panel-hint">${ui.dimensionsHint}</div>

          <div class="dimensions-grid">

            <label class="dimension-tile">

              <span class="dimension-heading"><ha-icon icon="mdi:arrow-expand-horizontal"></ha-icon><span>${ui.width}</span></span>

              <span class="dimension-input-wrap">

                <input class="studio-input dimension-input" type="text" name="width"

                  .value=${widthValue} placeholder="—" @change=${this.onTextChange} />

              </span>

              <span class="dimension-meta">${widthValue.trim() ? ui.dimensionStatus : ui.dimensionDefault}</span>

            </label>

            <label class="dimension-tile">

              <span class="dimension-heading"><ha-icon icon="mdi:arrow-expand-vertical"></ha-icon><span>${ui.height}</span></span>

              <span class="dimension-input-wrap">

                <input class="studio-input dimension-input" type="text" name="height"

                  .value=${heightValue} placeholder="—" @change=${this.onTextChange} />

              </span>

              <span class="dimension-meta">${heightValue.trim() ? ui.dimensionStatus : ui.dimensionDefault}</span>

            </label>

          </div>

        </div>



        ${selected === 'custom' ? html`

          <div class="studio-panel">

            <div class="panel-title">${ui.colors}</div>

            <div class="panel-hint">${ui.colorsHint}</div>

            ${this.colorControl('crmBackground', t('background'), ui.reset)}

            ${this.colorControl('crmAccent', t('accent'), ui.reset)}

            ${this.colorControl('crmText', t('text'), ui.reset)}

            <div class="color-row">

              <span class="field-label">${ui.iconColor}</span>

              <select

                class="studio-input"

                name="crmIconMode"

                .value=${this.config.crmIconMode ?? 'auto'}

                @change=${this.onTextChange}

              >

                <option value="auto">${ui.iconAuto}</option>

                <option value="custom">${ui.iconCustom}</option>

              </select>

            </div>

            ${this.config.crmIconMode === 'custom'

              ? this.colorControl('crmIconColor', ui.iconColor, ui.reset)

              : ''}

          </div>

        ` : ''}



        <div class="studio-panel shape-panel">

          <div class="shape-heading">

            <div class="panel-title">${ui.shape}</div>

            <button class="reset" type="button" @click=${() => this.resetField('crmBorderRadius')}>${ui.reset}</button>

          </div>

          <div class="shape-workspace">

            <div class="shape-illustration" aria-hidden="true">

              <div class="shape-sample" style=${`border-radius: ${radius};`}>

                <span></span><span></span><span></span>

              </div>

            </div>

            <div class="shape-settings">

              <div class="shape-value-row">

                <label class="field-label" for="radius">${t('borderRadius')}</label>

                <span class="shape-value">${hasCustomRadiusUnit ? ui.customUnit : `${radiusSliderValue}px`}</span>

              </div>

              <input class="radius-range" type="range" min="0" max="48" step="1"

                aria-label=${t('borderRadius')} .value=${String(radiusSliderValue)}

                @input=${(event: Event) => this.setField('crmBorderRadius', `${(event.currentTarget as HTMLInputElement).value}px`)} />

              <div class="range-labels"><span>${ui.radiusSquare}</span><span>${ui.radiusSoft}</span></div>

            </div>

          </div>

          <div class="shape-manual">

            <input id="radius" class="studio-input" type="text" name="crmBorderRadius"

              .value=${radius} @change=${this.onTextChange} />

            <div class="field-hint">${ui.radiusHint}</div>

          </div>

        </div>



        <div class="studio-panel">

          <div class="panel-title">${ui.preview}</div>

          <div class="preview" style=${`background: ${background}; color: ${text}; border-radius: ${radius};`}>

            <div class="preview-cover" style=${`background: ${accent}; color: ${this.contrastInk(accent)};`}>♫</div>

            <div class="preview-info"><strong>${ui.previewTitle}</strong><span>${ui.previewSubtitle}</span></div>

            <span class="preview-play" style=${`background: ${accent}; color: ${this.contrastInk(accent)};`}>▶</span>

          </div>

        </div>

      </div>

    `;

  }



  static get styles() {

    return css`

      :host { display: block; min-width: 0; }

      .dimensions-grid {

        display: grid;

        grid-template-columns: repeat(2, minmax(0, 1fr));

        gap: 12px;

      }

      .dimensions-panel .panel-hint { margin-bottom: 13px; }

      .dimension-tile { display: flex; flex-direction: column; min-width: 0; gap: 10px; padding: 12px; border: 1px solid var(--divider-color); border-radius: 12px; background: var(--secondary-background-color, rgba(128,128,128,.07)); transition: border-color .15s ease; }

      .dimension-tile:focus-within { border-color: var(--crm-editor-accent, var(--primary-color, #34d399)); }

      .dimension-heading { display: flex; align-items: center; gap: 7px; color: var(--primary-text-color); font-size: 12px; font-weight: 650; }

      .dimension-heading ha-icon { --mdc-icon-size: 18px; color: var(--crm-editor-accent, var(--primary-color, #34d399)); }

      .dimension-input-wrap { display: block; }

      .dimension-input { height: 42px; font-size: 16px; font-weight: 650; font-variant-numeric: tabular-nums; background: var(--card-background-color, var(--ha-card-background)); }

      .dimension-input::placeholder { color: var(--secondary-text-color); opacity: .65; }

      .dimension-meta { font-size: 10px; line-height: 1.35; color: var(--secondary-text-color); }

      .shape-heading { display: flex; align-items: center; justify-content: space-between; gap: 10px; }

      .shape-workspace { display: grid; grid-template-columns: 82px minmax(0, 1fr); align-items: center; gap: 15px; margin-top: 14px; }

      .shape-illustration { display: grid; place-items: center; height: 84px; border: 1px solid var(--divider-color); border-radius: 13px; background: var(--secondary-background-color, rgba(128,128,128,.07)); }

      .shape-sample { display: flex; flex-direction: column; gap: 6px; justify-content: center; width: 52px; height: 52px; padding: 11px; border: 2px solid var(--crm-editor-accent, var(--primary-color, #34d399)); background: var(--card-background-color, var(--ha-card-background)); transition: border-radius .12s ease; }

      .shape-sample span { display: block; height: 4px; border-radius: 3px; background: var(--secondary-text-color); opacity: .65; }

      .shape-sample span:first-child { background: var(--crm-editor-accent, var(--primary-color, #34d399)); opacity: 1; }

      .shape-sample span:last-child { width: 65%; }

      .shape-settings { min-width: 0; }

      .shape-value-row { display: flex; justify-content: space-between; align-items: center; gap: 6px; margin-bottom: 12px; }

      .shape-value { font-size: 11px; font-weight: 650; color: var(--crm-editor-accent, var(--primary-color, #34d399)); text-align: right; }

      .radius-range { display: block; width: 100%; margin: 0; accent-color: var(--crm-editor-accent, var(--primary-color, #34d399)); cursor: pointer; }

      .range-labels { display: flex; justify-content: space-between; gap: 8px; margin-top: 8px; font-size: 10px; color: var(--secondary-text-color); }

      .shape-manual { margin-top: 13px; padding-top: 12px; border-top: 1px solid var(--divider-color); }

      .shape-manual .studio-input { height: 39px; }

      .dimension-field {

        display: flex;

        flex-direction: column;

        gap: 8px;

        min-width: 0;

      }

      @media (max-width: 340px) {

        .dimensions-grid { grid-template-columns: 1fr; }

      }



      * { box-sizing: border-box; }

      .studio { display: grid; gap: 11px; min-width: 0; color: var(--primary-text-color); }

      .studio-heading { padding: 3px 2px 5px; }

      .studio-kicker { font-size: 10px; font-weight: 700; letter-spacing: .12em; color: var(--secondary-text-color); }

      h3 { margin: 6px 0 0; font-size: 16px; font-weight: 650; color: var(--primary-text-color); }

      .studio-panel { min-width: 0; padding: 15px; border: 1px solid var(--divider-color); border-radius: 14px; background: var(--card-background-color, var(--ha-card-background)); }

      .panel-title { font-size: 13px; font-weight: 650; }

      .panel-hint, .field-hint { font-size: 11px; line-height: 1.5; color: var(--secondary-text-color); }

      .panel-hint { margin: 4px 0 15px; }

      .field-hint { margin-top: 7px; }

      .theme-list { display: grid; gap: 9px; }



      .height-mode-visual {

        display: grid;

        grid-template-columns: repeat(3, minmax(0, 1fr));

        gap: 8px;

        margin-top: 12px;

      }

      .height-visual-option {

        display: flex;

        flex-direction: column;

        align-items: center;

        justify-content: space-between;

        gap: 12px;

        min-width: 0;

        min-height: 172px;

        padding: 12px 7px 10px;

        border: 1px solid var(--divider-color);

        border-radius: 12px;

        background: transparent;

        color: var(--primary-text-color);

        font: inherit;

        cursor: pointer;

      }

      .height-visual-option.selected {

        border: 2px solid var(--crm-editor-accent, var(--primary-color, #34d399));

        padding: 11px 6px 9px;

      }

      .height-visual-option:focus-visible {

        outline: 2px solid var(--crm-editor-accent, var(--primary-color, #34d399));

        outline-offset: 2px;

      }

      .height-visual-art {

        display: flex;

        flex-direction: column;

        justify-content: center;

        gap: 6px;

        width: 100%;

        max-width: 105px;

        height: 83px;

        padding: 10px;

        border: 3px solid currentColor;

        border-radius: 9px;

      }

      .height-visual-art.compact {

        height: 65px;

        margin-top: 18px;

      }

      .height-visual-art.fill {

        height: 95px;

        margin-top: -6px;

      }

      .art-row {

        display: block;

        height: 13px;

        border-radius: 3px;

        background: #d1d1d1;

      }

      .art-row.accent {

        background: var(--crm-editor-accent, var(--primary-color, #34d399));

      }

      .art-line {

        display: block;

        border-top: 1px solid #aaa;

      }

      .art-fill {

        display: grid;

        place-items: center;

        flex: 1;

        border-radius: 4px;

        background: #e3e3e3;

        color: var(--crm-editor-accent, var(--primary-color, #34d399));

      }

      .art-fill ha-icon {

        --mdc-icon-size: 40px;

      }

      .height-visual-label {

        font-size: 12px;

        font-weight: 500;

      }





      .theme-option { display: flex; align-items: center; width: 100%; min-width: 0; gap: 12px; padding: 12px; border: 2px solid transparent; border-radius: 14px; background: var(--secondary-background-color, rgba(128,128,128,.1)); color: var(--primary-text-color); text-align: left; font: inherit; cursor: pointer; transition: border-color .15s ease, background .15s ease; }

      .theme-option:hover { background: var(--divider-color, rgba(128,128,128,.16)); }

      .theme-option.selected { border-color: var(--crm-editor-accent, var(--primary-color, #34d399)); }

      .theme-option:focus-visible { outline: 2px solid var(--crm-editor-accent, var(--primary-color, #34d399)); outline-offset: 2px; }

      .theme-thumbnail { display: block; flex: 0 0 62px; width: 62px; height: 64px; padding: 7px; border: 1px solid rgba(128,128,128,.4); border-radius: 11px; overflow: hidden; }

      .theme-thumbnail.light { background: #f5f6f7; }

      .theme-thumbnail.dark { background: #141719; }

      .theme-thumbnail.auto { background: linear-gradient(90deg, #f5f6f7 50%, #141719 50%); }

      .theme-thumbnail.custom { background: linear-gradient(135deg, #ac83f7, #f9b86a, #58c6b2); }

      .thumbnail-paper { display: block; width: 100%; height: 100%; padding: 5px; border-radius: 5px; }

      .light .thumbnail-paper { background: #fff; color: #17191a; }

      .dark .thumbnail-paper { background: #24282b; color: #f7f7f7; }

      .auto .thumbnail-paper { background: linear-gradient(90deg, #fff 50%, #24282b 50%); color: #17191a; }

      .custom .thumbnail-paper { background: rgba(255,255,255,.72); color: #35244b; }

      .thumbnail-aa { display: block; font-size: 12px; font-weight: 700; }

      .thumbnail-line { display: block; width: 75%; height: 3px; margin-top: 8px; border-radius: 3px; background: currentColor; opacity: .3; }

      .theme-copy { display: grid; flex: 1; min-width: 0; gap: 5px; }

      .theme-copy strong { font-size: 13px; font-weight: 650; }

      .theme-copy small { font-size: 11px; line-height: 1.4; color: var(--secondary-text-color); }

      .theme-indicator { display: grid; place-items: center; flex: 0 0 21px; width: 21px; height: 21px; border-radius: 50%; border: 2px solid var(--secondary-text-color); opacity: .7; }

      .selected .theme-indicator { border-color: var(--crm-editor-accent, var(--primary-color, #34d399)); background: var(--crm-editor-accent, var(--primary-color, #34d399)); color: var(--card-background-color, #101b19); opacity: 1; }

      .theme-indicator ha-icon { --mdc-icon-size: 15px; }

      .color-row + .color-row { margin-top: 14px; }

      .color-top { display: flex; justify-content: space-between; align-items: center; gap: 10px; margin-bottom: 7px; }

      .field-label { font-size: 12px; font-weight: 550; color: var(--secondary-text-color); }

      .reset { border: 0; padding: 2px 0; background: transparent; color: var(--crm-editor-accent, var(--primary-color, #34d399)); font: inherit; font-size: 11px; font-weight: 650; cursor: pointer; }

      .reset:hover { text-decoration: underline; }
      .reset { text-underline-offset: 3px; }

      .color-controls { display: flex; align-items: center; gap: 9px; }

      .color-picker { position: relative; flex: 0 0 40px; width: 40px; height: 38px; border: 1px solid var(--divider-color); border-radius: 9px; overflow: hidden; cursor: pointer; }

      .color-picker input { display: block; width: 100%; height: 100%; padding: 0; border: 0; background: transparent; cursor: pointer; }

      .color-picker input::-webkit-color-swatch-wrapper { padding: 3px; }

      .color-picker input::-webkit-color-swatch { border: 0; border-radius: 5px; }

      .studio-input { display: block; width: 100%; min-width: 0; height: 38px; padding: 0 11px; border: 1px solid var(--divider-color); border-radius: 9px; background: var(--secondary-background-color); color: var(--primary-text-color); font: inherit; font-size: 13px; }

      .studio-input:focus-visible, .reset:focus-visible, .color-picker:focus-within { outline: 2px solid var(--primary-color); outline-offset: 2px; }

      .preview { display: flex; align-items: center; gap: 11px; min-height: 79px; margin-top: 12px; padding: 12px; overflow: hidden; }

      .preview-cover { display: grid; place-items: center; width: 49px; height: 49px; flex-shrink: 0; border-radius: 9px; font-size: 24px; font-weight: 700; }

      .preview-info { display: flex; flex: 1; flex-direction: column; gap: 4px; min-width: 0; }

      .preview-info strong { font-size: 12px; overflow: hidden; text-overflow: ellipsis; white-space: nowrap; }

      .preview-info span { font-size: 11px; opacity: .7; }

      .preview-play { display: grid; place-items: center; flex-shrink: 0; width: 32px; height: 32px; border-radius: 50%; font-size: 12px; }

      @media (max-width: 340px) { .studio-panel { padding: 11px; } .theme-option { gap: 9px; padding: 9px; } .theme-thumbnail { flex-basis: 52px; width: 52px; height: 56px; } }

    `;

  }

}



customElements.define('crm-design-editor', DesignEditor);
