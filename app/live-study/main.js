import ExerciseJS from './javascript/exercise.js';

export default class LiveStudy {

  title = 'Live Study';
  virDir = {};
  populated = {};
  active = null;
  editor = null;
  buttonsContainer = null;
  loopGuard = {
    active: false,
    max: 20
  }
  clearAll = {
    intervals: false,
    timeouts: false
  }

  constructor(index, editor, buttonsContainer) {
    this.virDir = index;
    this.populated = LiveStudy.populate(index, index.path, index.config);
    this.title = index.config.title;
    // editor.onKeyUp(() => {
    //   console.clear();
    //   this.active.studyWith('console', 'monacoModel', this.active.config.loopGuard || this.loopGuard)
    // });
    this.editor = editor;
    this.buttonsContainer = buttonsContainer;
    if (index.config.loopGuard) {
      this.loopGuard = index.config.loopGuard;
    }
  }

  static populate(data, path, config) {
    const Exercise = ExerciseJS;
    const copy = Object.assign({}, data);
    if (data.files) {
      copy.populated = data.files
        .map(file => new Exercise(file.path, path, config));
    };
    if (data.dirs) {
      copy.dirs = data.dirs.map(subDir => LiveStudy.populate(subDir, path + subDir.path, subDir.config ? Object.assign({}, config, subDir.config) : config));
    };
    return copy;
  }

  renderExercises(virDir = this.populated) {

    const detailsEl = document.createElement('details');
    detailsEl.style = 'margin-top: 1%; margin-bottom: 1%;';

    const summaryEl = document.createElement('summary');
    summaryEl.innerHTML = virDir.path;
    detailsEl.appendChild(summaryEl);

    const subListEl = document.createElement('ul');
    subListEl.style = 'padding-left: 1em';
    if (virDir.populated) {
      virDir.populated.forEach(exercise => {
        // const exerciseEl = exercise.render();
        const exerciseEl = document.createElement('button');
        exerciseEl.innerHTML = exercise.path.rel;
        exerciseEl.onclick = () => {
          history.replaceState(null, "", `?path=${encodeURIComponent(exercise.path.abs)}`);
          document.getElementById('current-path').innerHTML = exercise.path.abs.split('/').slice(2).join('/');
          editor.setModel(exercise.monacoModel);

          this.active = exercise;
          console.clear();
          if (exercise.code === null) {
            exercise.load((err, code) => {
              exercise.monacoModel.setValue(code);
              this.renderStudyButtons(exercise);
              exercise.studyWith('console', 'monacoModel', exercise.config.loopGuard || this.loopGuard);
            });
          } else {
            this.renderStudyButtons(exercise);
            exercise.studyWith('console', 'monacoModel', exercise.config.loopGuard || this.loopGuard)
          }
        }

        const loadChangesEl = document.createElement('button');
        loadChangesEl.innerHTML = 'reload';
        loadChangesEl.onclick = () => {
          exercise.load((err, code) => {
            exercise.monacoModel.setValue(code);
            editor.setModel(exercise.monacoModel);
            this.renderStudyButtons(exercise);
            console.clear();
            exercise.studyWith('console', 'monacoModel', exercise.config.loopGuard || this.loopGuard);
          });
        }

        const exerciseContainer = document.createElement('div');
        exerciseContainer.style = 'margin-top: 0.5em; margin-bottom: 0.5em;';
        exerciseContainer.appendChild(exerciseEl);
        exerciseContainer.appendChild(loadChangesEl);
        subListEl.appendChild(exerciseContainer);
      });
    };
    if (virDir.dirs) {
      virDir.dirs.forEach(subDir => {
        const subDirEl = this.renderExercises(subDir);
        subListEl.appendChild(subDirEl);
      });
    };
    detailsEl.appendChild(subListEl);
    return detailsEl;
  }


  renderLoopGuardEl(loopGuard = this.loopGuard) {

    const withLoopGuard = document.createElement('input');
    withLoopGuard.setAttribute('type', 'checkbox');
    withLoopGuard.checked = loopGuard.active;
    withLoopGuard.onchange = () => this.loopGuard.active = !this.loopGuard.active;

    const loopGuardInput = document.createElement('input');
    loopGuardInput.value = loopGuard.max;
    loopGuardInput.name = 'max';
    loopGuardInput.style = 'width:3em';
    loopGuardInput.onchange = () => loopGuard.max = Number(loopGuardInput.value);

    const loopGuardForm = document.createElement('form');
    loopGuardForm.style = 'display:inline-block;';
    loopGuardForm.appendChild(withLoopGuard);
    loopGuardForm.appendChild(document.createTextNode('loop guard: '));
    loopGuardForm.appendChild(loopGuardInput);

    return loopGuardForm;
  }

  renderStudyButtons(exercise) {
    const container = document.createElement('div');

    const formatButton = document.createElement('button');
    formatButton.innerHTML = 'format code';
    formatButton.onclick = () => editor.trigger('anyString', 'editor.action.formatDocument');;
    container.appendChild(formatButton);

    container.appendChild(this.renderLoopGuardEl(exercise.config.loopGuard || this.loopGuard));

    container.appendChild(document.createElement('br'));

    for (let vizTool of exercise.config.buttons) {
      const name = Object.keys(vizTool)[0];
      const include = Object.values(vizTool)[0];
      if (include) {
        const vizToolButton = document.createElement('button');
        vizToolButton.style = 'padding-right: .5em';
        vizToolButton.innerHTML = name;
        vizToolButton.onclick = () => {
          exercise.studyWith(name, 'monacoModel', exercise.config.loopGuard || this.loopGuard)
        };
        container.appendChild(vizToolButton);
      }
    }

    this.buttonsContainer.innerHTML = '';
    this.buttonsContainer.appendChild(container);
  }

  render(exercise = this.active) {
    const container = document.createElement('div');

    const renderedExercises = this.renderExercises();
    const unWrapped = renderedExercises.lastChild;
    const divContainer = document.createElement('div');
    for (let child of Array.from(unWrapped.children)) {
      divContainer.appendChild(child);
    }
    container.appendChild(divContainer);

    if (exercise) {
      this.renderStudyButtons(exercise);
    } else {
      const findFirstExercise = (virDir) => {
        if (virDir.populated) {
          return virDir.populated[0]
        } else if (virDir.dirs) {
          return findFirstExercise(virDir.dirs[0]);
        }
      }
      this.renderStudyButtons(findFirstExercise(this.populated));
    }

    return container;
  }
}
