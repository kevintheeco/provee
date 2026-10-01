/* provee.kr 영어판
   한국어 원문을 열쇠로 쓰는 사전(T)과, 화면의 글자를 그 사전으로 바꾸고 되돌리는 로직을 한 파일에 둔다.
   index.html에는 언어 버튼(data-lang)과 이 파일을 부르는 script 한 줄만 있다.

   사전에 줄을 더하는 법
   - 열쇠는 화면에 있는 한국어 원문 그대로. 공백·줄바꿈은 한 칸으로 줄이고, 태그는 속성을 뺀 모양(<b>, <br>, <span>…)으로 쓴다.
   - 글자만 있는 요소는 글자만 쓰면 된다: '비교': 'Compare'
   - 문장 안에 <b>·<br>·<a> 같은 태그가 섞여 있으면 태그까지 넣어 쓴다. 영어 쪽도 같은 태그(순서 그대로)를 쓰면
     원래 요소를 그대로 살려 둔 채 글자만 바꾼다(스크립트가 붙잡고 있는 요소가 끊기지 않는다). <br>은 개수·위치가 달라도 된다.
   - 사전에 없는 한국어는 그대로 두고 window.__i18nMissing 에 모인다(개발용, 콘솔 경고 없음).
*/
(()=>{
const T={
/* ---------- 문서 제목·설명 ---------- */
'Provee | 손으로 푸는 과목을 위한 AI 튜터':'Provee | An AI tutor for subjects you solve by hand',
'Provee | 손으로 푸는 과정을 읽고, 답 대신 되물어 스스로 풀게 돕는 수학 AI 튜터':'Provee | A math AI tutor that reads your handwritten work and asks questions instead of handing over answers, so you solve it yourself',
'Provee | 손으로 풀어야 이해되는 과목을 위한 AI 튜터':'Provee | An AI tutor for subjects you learn with pen in hand',
'쓰는 순간 읽고, 막히면 되묻고, 푼 순서 그대로 다시 봅니다. 2026년 10월 서강대에서 먼저 엽니다.':'It reads as you write, asks back when you get stuck, and replays your work in the order you wrote it. Opening first at Sogang University in October 2026.',

/* ---------- 머리글·메뉴 ---------- */
'Provee 처음으로':'Provee home',
'주 메뉴':'Main menu',
'모바일 메뉴':'Mobile menu',
'메뉴 열기':'Open menu',
'메뉴 닫기':'Close menu',
'기능':'Features',
'비교':'Compare',
'요금제':'Pricing',
'회사 이야기':'Our story',
'자주 묻는 질문':'FAQ',
'사전신청':'Pre-register',
'사전신청 혜택 받기':'Get the early-bird offer',
'Provee Ground 열기':'Open Provee Ground',
'필기 입력':'Handwriting input',
'획 단위 인식':'Stroke-level recognition',
'바로 그리는 그래프':'Instant graphs',
'되묻는 튜터':'A tutor that asks back',
'찍지 않고, 쓰는 대로 읽습니다':'No photos. It reads as you write',
'사진이 놓치는 쓴 순서까지 읽습니다':'Reads the order you wrote in, which a photo misses',
'기다리지 않고 식에서 바로 그립니다':'Graphs straight from the equation, no waiting',
'막히면 정답 대신 놓친 조건을 짚습니다':'Points to what you missed, not the answer',
'언제 어디서든 내 풀이를 다시 봅니다':'Your own work, anytime, anywhere',
'링크 하나로 같은 노트에 함께 풉니다':'One link, the same notes, solved together',

/* ---------- 첫 화면 ---------- */
'창가 책상에서 태블릿에 펜으로 쓰는 손':'A hand writing with a pen on a tablet at a desk by the window',
'<mark>손으로 풀어야 이해되는</mark><br>과목을 위한 AI 튜터':'An AI tutor for subjects<br><mark>you learn with pen in hand</mark>',
'미적분, 통계, 선형대수, 물리처럼<br><b>직접 문제를 풀어가는 과정 자체가 학습</b>인<br>과목을 위한 당신만의 선생님':'A tutor of your own for calculus, statistics, <br>linear algebra, physics and every subject where <br><b>working the problem out is the learning</b>',
'기능 보기':'See features',

/* 첫 화면: 태블릿 속 장면 5개와 왼쪽 문구 */
'손으로 푸는 과목을 AI로 공부하면':'Studying pen-and-paper subjects with AI',
'<span>사진 찍고,</span> <span>타이핑하고,</span> <span>기다리고.</span><br>수학은 언제 푸나요?':'<span>Snap,</span> <span>type,</span> <span>wait.</span><br>When do you do math?',
'문제를 매번 찍어 올리는 게 번거로웠다':'found snapping and uploading every problem a hassle',
'사진으로 올리면<br>식이 다르게 읽히기도 합니다':'A photo can<br>get your math wrong',
'뭉쳐 쓴 2x + 1을 사진으로 GPT에 올렸을 때 읽은 식':'what GPT read from a photo of a cramped 2x + 1',
'하나 물었는데 답과 풀이,<br>묻지 않은 것까지 쏟아집니다':'You ask one thing.<br>It answers everything.',
'AI가 스스로 생각하게 돕기보다 정답과 전체 풀이를 바로 보여 줄 때가 많았다':'often got the answer and full solution instead of help thinking',
'삼차함수의 개형 종류 알려줘':'What shapes can a cubic graph take?',
'물어본 것':'What I asked',
'묻지 않은 것':'What I didn\'t ask',
'63%: 생성형 AI를 써 본 대학(원)생·졸업생 43명 중 27명, \'자주\' 이상(URP, 2026년 7월). 화면은 재구성':'63%: 27 of 43 undergrads, grad students and recent grads who have used generative AI, "often" or more (URP survey, July 2026). Screen is a reconstruction',
'새 채팅을 열면<br>처음부터 다시 설명합니다':'Every new chat<br>starts from scratch',
'새 채팅마다 내 수준을 다시 설명해야 했다':'had to re-explain their level in every new chat',
'풀이는 학생이 쓰고,<br>Provee는 옆에서 읽습니다':'You write the solution.<br>Provee reads along.',
'펜으로 쓰는 식을 따라 읽다가, 막힌 곳에서만 먼저 말을 겁니다.':'It follows the math as you write and speaks up only where you get stuck.',
'같은 필기를 사진으로<br>GPT에 올렸을 때':'Same handwriting,<br>uploaded to GPT as a photo',
'Provee가 쓴 순서대로<br>읽은 결과':'Provee, reading<br>in stroke order',
'%: 생성형 AI를 써 본 대학생 43명 설문(URP, 2026년 7월)<br>24+1: 대표의 실제 필기 사진을 GPT-5.6 Sol에 올린 1회 실측':'%: Survey of 43 university students who have used generative AI (URP, July 2026)<br>24+1: A single test with a photo of our CEO\'s real handwriting, uploaded to GPT-5.6 Sol',
'사진으로 읽은 식 <b>24 + 1</b>':'Read from photo: <b>24 + 1</b>',
'AI 채팅':'AI Chat',
'사진 속 식은 <b>24 + 1</b> 입니다. 차례대로 풀어 보면':'The expression in the photo is <b>24 + 1</b>. Working through it step by step,',
'+ 새 채팅':'+ New chat',
'새 채팅':'New chat',
'무엇을 도와드릴까요?':'How can I help?',
'이차방정식':'Quadratic equations',
'읽은 식':'Read as',

// subjects: 외우는 공부와 풀어 보는 공부 (index.html #subjects). 이 섹션 줄은 여기 한곳에만 둔다
'외우는 공부와 풀어 보는 공부':'Learning by heart, learning by solving',
'외운 것은 카드로 꺼내 보면 되지만, <br><em>푸는 힘은 직접 풀어 봐야 붙습니다</em>':'What you memorize, flashcards help you recall. <br><em>The power to solve only comes from solving.</em>',
'AI 학습 도구는 이미 많습니다. 많은 도구가 강의자료를 요약하고 퀴즈와 플래시카드로 바꿔, 외우는 공부를 잘 돕습니다. 손으로 풀어 보는 공부를 돕는 도구는 드뭅니다.':'There are already plenty of AI study tools. Many turn lecture notes into summaries, quizzes and flashcards, and they do a good job of helping you memorize. Tools that help you work problems out by hand are rare.',
'외우는 공부':'Learning by heart',
'단어 · 용어 · 정의':'Words · terms · definitions',
'여러 번 꺼내 보며 익히는 공부입니다. 카드로 스스로 시험해 보는 방식이 잘 맞습니다.':'You learn it by recalling it again and again. Quizzing yourself with cards works well.',
'<b>AI 튜터가 할 일</b>노트 정리, 마인드맵, 플래시카드를 만드는 수고를 줄여 줍니다.':'<b>What an AI tutor should do</b>Take the effort out of making notes, mind maps and flashcards.',
'손으로 푸는 공부':'Solving by hand',
'미적분 · 통계 · 선형대수 · 물리 문제 풀이':'Problem solving in calculus · statistics · linear algebra · physics',
'그렸다 지우고 다시 그리는 시행착오 속에서 푸는 힘이 붙습니다.':'The power to solve grows through trial and error: drawing, erasing, drawing again.',
'<b>AI 튜터가 할 일</b>사진 찍고 다시 설명하는 수고는 없애고, 생각하는 시간은 학생에게 남겨 둡니다. 막힌 곳에서만 먼저 묻습니다.':'<b>What an AI tutor should do</b>Remove the hassle of snapping photos and explaining again, and leave the thinking time to the student. Speak up first only where you are stuck.',
'2024학년도 수능 14번을 18분 동안 손으로 푼 실제 필기. 그래프를 그렸다가 지우고 다시 그렸고, 중간에 3분 19초 동안 펜을 놓았습니다.':'Real handwriting from solving Question 14 of the 2024 CSAT math exam by hand over 18 minutes. A graph was drawn, erased and redrawn, and the pen was set down for 3 minutes 19 seconds along the way.',
'오른쪽은 대표가 2024학년도 수능 14번을 18분 동안 푼 실제 필기(획 594개)를 빠르게 재생했습니다. 점선은 그렸다가 지운 획입니다. 왼쪽 카드는 설명을 위한 예시입니다.':'On the right is real handwriting by our CEO (594 strokes) from solving Question 14 of the 2024 CSAT math exam over 18 minutes, replayed at speed. Dotted lines are strokes that were drawn and then erased. The cards on the left are an illustration.',
'앞면 카드는 설명을 위한 예시입니다. 판을 뒤집으면 나오는 필기는 대표가 2024학년도 수능 14번을 18분 동안 푼 실제 기록(획 594개)이며, 스크롤에 맞춰 다시 그립니다. 점선은 그렸다가 지운 획입니다.':'The flashcards on the front are an illustration. The handwriting on the back is a real record of our CEO solving Question 14 of the 2024 CSAT math exam over 18 minutes (594 strokes), redrawn as you scroll. Dotted lines are strokes that were drawn and then erased.',
'영단어':'Vocabulary',
'뜻':'Meaning',
'버리다':'to leave behind',
'꺼리는':'unwilling',
'정확한':'exact',
'피할 수 없는':'unavoidable',
'외운 카드':'Cards learned',
'지우고 다시 그린 그래프':'Graph erased and redrawn',
'펜을 놓은 3분 19초':'Pen lifted for 3m 19s',
// /subjects

/* ---------- 기능 6개 ---------- */
'기능 목록':'Feature list',
'펜을 내려놓지 않아도<br>튜터가 읽습니다':'Keep your pen down.<br>Your tutor reads as you write',
'노트와 튜터가 한 화면에 있어, 한 줄을 쓰면 읽은 식이 바로 옆에 뜹니다. 폰을 들어 찍고 올리던 시간이 그대로 푸는 시간이 됩니다.':'Your notes and your tutor share one screen. Write a line and what Provee read appears right beside it. The time you spent picking up your phone to snap and upload goes back into solving.',
'사진은 다 쓴 결과만 보고,<br>Provee는 쓴 순서까지 읽습니다':'A photo sees only the finished page.<br>Provee reads the order you wrote it in',
'사진을 읽는 AI가 받는 건 다 쓴 페이지 한 장이라, 무엇을 먼저 썼는지 남지 않습니다. Provee는 획마다 쓴 자리와 시각을 함께 받아 여기저기 흩어 쓴 풀이를 쓴 순서대로 잇고, 지운 식과 펜을 멈춘 시간까지 압니다. 이 기록이 그대로 Provee Note가 됩니다.':'An AI that reads photos gets one finished page, with no trace of what came first. Provee receives every stroke with where and when it was written, so it follows work scattered across the page in the order you wrote it, and knows what you erased and where your pen paused. That record becomes your Provee Note.',
'AI가 그려 주기를 기다리던 1~2분,<br>이제 Provee에서는 바로.':'The minute or two you waited for AI to draw a graph?<br>On Provee, it\'s instant.',
'Provee는 그래프를 그림 파일로 만들지 않고, 식에서 바로 선으로 그립니다. 교점과 넓이처럼 풀이에 필요한 표시도 단계마다 함께 올라옵니다.':'Provee doesn\'t render an image file. It draws the graph straight from the equation, and the marks your solution needs, like intersections and areas, appear step by step.',
'막히면 정답 대신<br>놓친 조건을 짚어 줍니다':'Stuck? It points to<br>what you missed,<br>not the answer',
'화면 속 실제 풀이에서는 거꾸로 그린 그래프를 혼자 고치기까지 1분 반이 걸렸습니다. Provee는 펜이 멈춘 그 자리에서 학생이 그린 그림을 보고 먼저 묻고, 힌트는 더 필요할 때만 한 단계씩 엽니다.':'In the real solution shown here, it took a minute and a half to catch a graph drawn upside down and fix it alone. Provee asks first, right where the pen stops, based on what the student drew, and opens hints one step at a time only when more help is needed.',
'학교 가는 길에도,<br>시험 직전에도<br>내가 쓴 풀이를 꺼내 봅니다':'On the way to school,<br>right before an exam,<br>pull up your own work',
'손으로 푼 풀이가 과목과 단원별로 차곡차곡 모입니다. 버스 안에서도, 시험장 앞에서도 폰에서 하나를 누르면 내 글씨가 쓴 순서 그대로 다시 써집니다.':'Everything you solve by hand is filed by subject and unit. On the bus or outside the exam room, tap one on your phone and your own handwriting writes itself out again, in the order you wrote it.',
'링크 하나로 모여,<br>같은 노트에 함께 풉니다':'Join with one link,<br>solve on the same notes',
'가입 없이 들어와 얼굴을 보며 같은 노트와 PDF 위에 씁니다. 필기와 목소리는 기기끼리 직접 오가고 서버에 남지 않습니다.':'Join without signing up, see each other, and write on the same notes and PDFs. Ink and voice travel directly between devices and are never stored on a server.',
'지금 무료로 쓸 수 있습니다':'Free to use right now',

/* 기능 장면 안 글자 (01 필기 입력) */
'공통수학1 · 이차방정식':'Common Math 1 · Quadratic equations',
'학습 종료':'End session',
'<b>문제</b>방정식 x² − 5x + 6 = 0 을 푸시오.':'<b>Problem</b>Solve x² − 5x + 6 = 0.',
'대표가 태블릿에 직접 쓴 실제 필기 두 묶음(획 14개, 25개)을 빠르게 재생한 화면':'Two real handwriting records our CEO wrote on a tablet (14 and 25 strokes), replayed at speed',
/* 02 획 단위 인식 */
'사진을 읽는 AI':'AI that reads photos',
'다 쓴 페이지를 찍어 올렸을 때':'given a photo of the finished page',
'같은 페이지를 쓰는 동안':'the same page, as it was written',
'쓴 시각':'Time',
'지운 그래프':'Erased graph',
'<b>사진</b>다 쓴 결과만':'<b>Photo</b>finished page only',
'<b>Provee 기록</b>획마다 위치와 시각':'<b>Provee record</b>where and when, stroke by stroke',
'사진':'Photo',
'받는 것':'Receives',
'이미지 <b>1</b>장':'<b>1</b> image',
'쓴 순서':'Writing order',
'지운 식':'Erased work',
'멈춘 시간':'Pauses',
'<i></i>사진에 없음':'<i></i>Not in a photo',
'일곱 곳을 오간 순서':'the path across 7 spots',
'대표가 2024학년도 수능 14번을 18분 동안 푼 실제 필기(획 594개). 왼쪽은 그 마지막 모습을 사진처럼 놓은 것, 오른쪽은 같은 기록을 쓴 순서대로 다시 쓴 화면. 번호는 쓰는 자리를 옮긴 순서, 옆 숫자는 그 자리를 쓰기 시작한 시각':'Our CEO\'s real handwriting from solving 2024 CSAT Question 14 over 18 minutes (594 strokes). Left: its final state, shown as a photo. Right: the same record rewritten in the order it was written. Numbers mark each move to a new spot; the time beside each is when writing began there',
/* 03 바로 그리는 그래프 */
'그래프로 알려줘':'Show me as a graph',
'동안 작업 중':'elapsed, working…',
'동안 작업함':'elapsed, done',
'그래프 이미지를 생성하는 중…':'Generating graph image…',
'그래프 이미지 완성':'Graph image ready',
'이미지를 기다립니다':'Waiting for the image',
'이제 그래프가 도착했습니다':'The graph has arrived',
'곡선 사이 넓이':'Area between curves',
'그래프 완성':'Graph ready',
'y=x³ 과 y=5x 로 둘러싸인 넓이 그래프':'Graph of the area enclosed by y = x³ and y = 5x',
'교점':'Intersections','넓이':'Area','적분':'Integral',
'교점 x = 0, ±√5':'Intersections x = 0, ±√5',
'왼쪽 대기 시간은 GPT-5.6 Sol이 그래프를 내놓기까지 걸린 1분 13초(2026년 9월 12일 대표 실측 1회)를 빠르게 감은 화면':'The wait on the left is the 1 min 13 s GPT-5.6 Sol took to produce the graph (one test by our CEO, September 12, 2026), fast-forwarded',
/* 04 되묻는 튜터 */
'2024 수능 14번':'2024 CSAT Q14',
'14번 문제 보기':'View Q14',
'펜 멈춤':'Pen paused',
'문제 다시 읽기':'Reread the problem',
'2024학년도 수능 수학 14번 문제: 두 자연수 a, b에 대하여 함수 f(x)는 ...':'2024 CSAT Math, Question 14: for two natural numbers a and b, the function f(x) is ...',
'x &gt; 2 쪽을 위로 볼록하게 그렸네. 첫 줄에서 a가 어떤 수라고 했지?':'You drew the x > 2 part curving upward. What did the first line say a is?',
'다시 읽을게':'I\'ll reread it',
'힌트 더 줘':'Another hint',
'대표가 2024학년도 수능 14번을 푼 실제 필기(획 594개, 18분) 가운데 그래프 대목을 빠르게 재생한 화면. 실제로는 혼자 고쳤고, 펜 멈춤 표시와 말풍선, 형광펜은 기능을 보여 주기 위한 연출':'The graph part of our CEO\'s real handwriting from 2024 CSAT Question 14 (594 strokes, 18 minutes), sped up. In reality he fixed it on his own; the pause timer, the speech bubble and the highlight are staged to show the feature',
/* 05 Provee Note */
'지운 획':'Erased',
'다시 보기':'Replay',
'미적분':'Calculus',
'등굣길':'Walking to school',
'시험 10분 전':'10 min before the exam',
'버스 안':'On the bus',
'나의 풀이':'My solutions',
'수학':'Math',
'수능 기출':'Past CSAT',
'풀이 18분 · 지움 20획':'18 min · 20 strokes erased',
'풀이 36초':'36 s',
'복습 1회':'Reviewed 1×',
'방정식 x² − 5x + 6 = 0 을 푸시오.':'Solve x² − 5x + 6 = 0.',
'두 자연수 a, b에 대하여 함수 f(x)는 …':'For two natural numbers a and b, the function f(x) is …',
'다시 보는 중':'Replaying',
'다 봤어요':'Done',
'연출':'Staged',
'등굣길, 시험 10분 전, 버스 안에서 같은 학생이 폰으로 Provee Note를 열어 자기 풀이를 다시 보는 연출 장면':'Staged scene: the same student opens Provee Note on a phone on the way to school, 10 minutes before an exam and on the bus, and replays his own solutions',
'AI로 만든 연출 사진(실존 인물 아님) 위에 앱 화면을 겹친 장면. 폰 속 필기는 대표가 직접 쓴 실제 필기 두 개(이차방정식 획 39개, 2024 수능 14번 획 594개)를 빠르게 재생한 것':'Staged AI-generated photos (not a real person) with the app screen laid on top. The handwriting on the phone is two real records our CEO wrote himself (a quadratic, 39 strokes; 2024 CSAT Q14, 594 strokes), replayed at speed',
/* 06 Provee Ground (이름은 예시) */
'proveeground.kr 초대 링크':'proveeground.kr invite link',
'2명 참여 중':'2 people here',
'민':'M','민서':'Minseo','도':'D','도윤':'Doyun',
'링크로 초대':'Invite by link',
'대표가 직접 쓴 실제 획 기록 두 개를 동시에 재생해 만든 장면(이름은 예시)':'Two real stroke recordings by our CEO, played back at the same time (names are examples)',

/* ---------- 비교 ---------- */
'같은 수학 문제,<br>도구마다 학생이 하는 일이 다릅니다':'Same math problem,<br>but what the student does depends on the tool',
'범용 AI 채팅':'General AI chat',
'사진 풀이 앱':'Photo-solver apps',
'문제를 넣는 법':'How you enter a problem',
'노트에 그대로 씀':'Write it in your notes',
'사진이나 파일을 올리고, 원하는 것을 글로 설명':'Upload a photo or file, then type out what you want',
'문제를 카메라로 찍음':'Snap the problem with the camera',
'읽는 것':'What it reads',
'쓴 획과 순서, 지운 식까지':'Your strokes and their order, even what you erased',
'올린 사진 한 장':'One uploaded photo',
'문제 사진':'A photo of the problem',
'막혔을 때':'When you\'re stuck',
'놓친 조건을 되묻고, 스스로 쓰게 함':'Asks about the condition you missed and has you write it yourself',
'정답과 전체 풀이를 먼저 받는 경우가 많음':'You often get the answer and the full solution first',
'정답과 단계별 풀이':'The answer and a step-by-step solution',
'그래프':'Graphs',
'식에서 벡터로 바로 그림':'Drawn as vectors straight from the equation',
'이미지를 만들 때까지 기다림':'You wait while an image is generated',
'앱마다 다름':'Varies by app',
'복습':'Review',
'과목·단원별 노트, 풀이 재생':'Notes by subject and unit, with solution replay',
'채팅마다 흩어짐':'Scattered across chats',
'찍은 문제 목록':'A list of snapped problems',
'2026년 9월 기준 공개 기능과 대표의 실제 사용 기록으로 정리했습니다. 서비스와 설정에 따라 다를 수 있습니다.':'Based on publicly available features and our CEO\'s own usage as of September 2026. Results may vary by service and settings.',

/* ---------- 요금제 (index.html의 PLANS가 그리는 카드도 여기서 번역) ---------- */
'필요한 만큼만 냅니다':'Pay only for what you need',
'대학생은 시험 기간에 주 단위로, 중고등은 보호자가 월 단위로 결제합니다.':'University students pay by the week around exams. For middle and high schoolers, a parent pays monthly.',
'대상 선택':'Choose a plan type',
'결제 주기':'Billing cycle',
'대학생':'University',
'중고등':'Middle & High',
'주 단위':'Weekly',
'월 단위':'Monthly',
'주력':'Featured',
'무료':'No cost',
'/ 주':'/ week',
'/ 월':'/ month',
'보호자 결제':'Paid by a parent',
'1과목은 계속 무료':'1 subject, always free',
'1과목':'1 subject',
'2과목':'2 subjects',
'3과목':'3 subjects',
'과목 무제한':'Unlimited subjects',
'문제풀이와 힌트':'Problem solving and hints',
'문제풀이 무제한':'Unlimited problem solving',
'힌트 중심 AI 개입':'Hint-first AI guidance',
'중간·기말 모의시험':'Midterm and final practice exams',
'실수 패턴 기억':'Remembers your mistake patterns',
'과목 간 기억 공유':'Memory shared across subjects',
'실시간 AI 개입':'Real-time AI guidance',
'학기 간 기억 공유':'Memory carried across semesters',
'카페 음료 한 잔 값을 기준으로 이름을 붙였습니다.':'Each plan is named after a café order that costs about the same.',
'하루 5문제':'5 problems a day',
'과외 한 시간':'One hour of tutoring',
'선생님과 반나절':'Half a day with a teacher',
'선생님과 하루 종일':'A full day with a teacher',
'단원평가':'Unit tests',
'수능형 모의시험':'CSAT-style practice exams',
'실수 패턴 기반 개입':'Guidance based on your mistake patterns',
'실전 수능 환경 시험':'Full CSAT simulation exams',
'실시간 개입':'Real-time guidance',
'개인별 학습 로드맵':'Personal study roadmap',
'출시 전 계획 가격이며 바뀔 수 있습니다. 월 결제는 4주 가격보다 최대 24% 쌉니다.':'Planned pre-launch prices in Korean won (KRW), subject to change. Monthly billing is up to 24% cheaper than four weekly payments.',
'출시 전 계획 가격이며 바뀔 수 있습니다. 중고등 버전은 2027년에 엽니다.':'Planned pre-launch prices in Korean won (KRW), subject to change. The middle and high school version opens in 2027.',

/* ---------- 로드맵 ---------- */
'서강대에서 시작합니다':'Starting at Sogang University',
'한 학교에서 먼저 제대로 검증하고, 그다음에 넓힙니다.':'We prove it properly at one school first, then expand.',
'이전':'Previous',
'다음':'Next',
'서강대 무료 베타':'Free beta at Sogang',
'중간고사 전에 정량과목 수강생부터 엽니다.':'Opening first to students in quantitative courses, before midterms.',
'다음 달':'Next month',
'유료 요금제 시작':'Paid plans launch',
'기말고사 기간에 주 단위 결제를 엽니다.':'Weekly billing opens in time for finals.',
'예정':'Scheduled',
'2027 봄':'Spring 2027',
'전국 대학으로':'Universities nationwide',
'서강대에서 확인한 지표로 전국 대학에 엽니다. 중고등 무료 버전도 함께 시작합니다.':'Opening to universities across Korea, backed by what we measure at Sogang. A free version for middle and high school starts at the same time.',
'계획':'Planned',
'2027 가을':'Fall 2027',
'대학과 중고등, 두 트랙':'Two tracks: university and secondary school',
'같은 튜터 엔진으로 두 요금제를 함께 운영합니다.':'One tutor engine runs both sets of plans.',
'미국 수학 시장':'The US math market',
'SAT·AP 수학을 준비하는 학생에게 영어판을 엽니다.':'An English version for students preparing for SAT and AP math.',

/* ---------- 회사 이야기 ---------- */
'AI가 똑똑해질수록,<br>학생은 덜 생각하게 됐습니다.':'The smarter AI got,<br>the less students had to think.',
'사진 한 장이면 답이 나오는 시대.<br>그 편리함이 받아 적는 공부가 됐습니다.':'One photo, one answer.<br>That convenience turned studying into copying.',
'Provee는 이 흐름을 거꾸로 갑니다.':'Provee goes the other way.',
'학습에 꼭 필요한 바람직한 어려움은 지키고,<br>설명하는 기쁨과 자긍심을 학생에게 돌려줍니다.':'We protect the desirable difficulties learning depends on,<br>and give students back the joy and pride of explaining.',
'답이 아니라 과정을 가르치는 참된 선생님을 곁에':'A true teacher by every student\'s side, one who teaches the process, not the answer',
'교육이 닿지 못한 곳까지 이어지는 세계의 교육 사다리':'A worldwide ladder of learning that reaches places education hasn\'t',
'첫 사용자는<br>만든 사람이었습니다':'The first user<br>was the one who built it',
'2026년 1학기, 서강대 경제학과 3학년. 계량경제, 미적분, 수리통계, 선형대수를 한 학기에 들었습니다. 통학 3시간을 줄이려 고시원에 살며 새벽까지 공부해도, 매일 AI와 씨름하느라 순공부 시간이 모자랐습니다.':'Spring semester 2026, third year in economics at Sogang University: econometrics, calculus, mathematical statistics and linear algebra, all in one semester. Living in a tiny rented room to cut a three-hour commute and studying until dawn still wasn\'t enough, because wrestling with AI every day ate into real study time.',
'2026년 6월 13일, 의지는 있지만 혼자서는 어려운 학생을 위한 도구를 직접 만들기로 했습니다.':'On June 13, 2026, the founder set out to build a tool for students who are willing but find it hard on their own.',
'경제수리통계학':'Mathematical Statistics for Economics',
'금융정책':'Financial Policy',
'만든 사람 본인의 2026년 1학기 중간고사, 기말고사 성적':'The founder\'s own midterm and final grades, spring semester 2026',
'Provee가 지나온 길':'How Provee got here',
'직접 쓰려고 개발 시작':'Started building it for personal use',
'매일 10시간 넘게 쓰고, 불편을 찾고, 고침':'Used it 10+ hours a day, found what was frustrating, fixed it',
'기말고사 직전, 학생 6명이 먼저 사용':'Six students tried it right before finals',
'경제학과와 동아리 학생 10명에게 소개':'Introduced to 10 students from the economics department and a campus club',
'손풀이 과목 학습자 설문 105명':'Surveyed 105 learners in hand-solved subjects',
'생성형 AI로 공부하며 겪는 불편을 직접 물음':'Asked them directly what gets in the way when studying with generative AI',
'실리콘밸리 Plug and Play IR 데모':'Investor demo at Plug and Play, Silicon Valley',
'"수익 전략이 없다"는 지적을 받고 사업 모델을 다시 짬':'Got the feedback "there\'s no revenue strategy" and rebuilt the business model',
'수학·학습과학 총괄 합류':'Head of Math & Learning Science joins',
'대치 종로학원 학습과학센터 고등수학 팀장 출신':'Former high school math lead, Jongro Academy Learning Science Center (Daechi)',
'대방역 사무실 마련':'Opened an office near Daebang Station',
'서울기독교세계관연구소(SIEW) 지원':'With support from SIEW, a Christian worldview institute in Seoul',
'함께 만드는 사람들':'The team',
'김수민':'Soomin Kim',
'CEO · 창립자':'CEO · Founder',
'서강대 경제학과. 첫 사용자이자 제품 총괄':'Economics, Sogang University. First user and head of product',
'손정범':'Jungbeom Son',
'백엔드·데이터·iOS, 개발팀 리드':'Backend, data and iOS. Leads engineering',
'하승주':'Seungju Ha',
'수학·학습과학 총괄':'Head of Math & Learning Science',
'한양대 수학과. 前 대치 종로학원 학습과학센터 고등수학 팀장':'Mathematics, Hanyang University. Former high school math lead, Jongro Academy Learning Science Center (Daechi)',
'임준서':'Junseo Lim',
'재무 모델, 가격, 시장 규모':'Financial model, pricing, market sizing',
'윤세빈':'Sebin Yoon',
'브랜드 전략':'Brand Strategy',
'브랜드, 사용자 인터뷰':'Brand and user interviews',
'김은우':'Eunwoo Kim',
'글로벌 그로스':'Global Growth',
'해외 마케팅, 콘텐츠':'International marketing and content',
'최지민':'Jimin Choi',
'그로스 마케터':'Growth Marketer',
'홍보, 모션그래픽, 마케팅 자동화':'PR, motion graphics, marketing automation',
'연주희':'Juhee Yeon',
'UI 디자이너':'UI Designer',
'제품·브랜드 디자인':'Product and brand design',
'시대가 바뀌어도,<br>사람이 자라고 배우는 교육의 가치는 사라지지 않습니다.':'However times change,<br>the value of an education where people grow and learn never fades.',

/* ---------- 자주 묻는 질문 ---------- */
'언제부터 쓸 수 있나요?':'When can I start using it?',
'2026년 10월, 서강대에서 무료 베타를 먼저 엽니다. 정량과목 수강생부터 시작해 2027년 봄에 전국 대학으로 넓힙니다.':'A free beta opens first at Sogang University in October 2026, starting with students in quantitative courses. In spring 2027 we expand to universities across Korea.',
'어떤 기기가 필요한가요?':'What device do I need?',
'펜으로 쓸 수 있는 태블릿이 가장 잘 맞습니다. 웹 브라우저에서 열리고, 앱도 함께 준비하고 있습니다.':'A tablet with a stylus works best. Provee runs in your web browser, and apps are on the way.',
'어떤 과목을 다루나요?':'Which subjects does it cover?',
'미적분, 통계, 선형대수, 계량경제, 물리처럼 손으로 풀며 배우는 과목입니다. 첫 학기는 서강대 정량과목에 맞춰 엽니다.':'Subjects you learn by working problems out by hand, like calculus, statistics, linear algebra, econometrics and physics. The first semester is built around Sogang\'s quantitative courses.',
'답은 바로 알려 주지 않나요?':'Won\'t it just give me the answer?',
'막힌 곳에서 먼저 되묻습니다. 그래도 어려우면 힌트를 한 단계씩 더 주고, 해설을 본 뒤에는 스스로 설명해 보게 합니다.':'Where you\'re stuck, it asks you a question first. If it\'s still hard, it gives hints one step at a time, and after you see the explanation, it has you explain it in your own words.',
'내 필기 기록은 어디에 쓰이나요?':'How is my handwriting data used?',
'복습 재생과 막힌 곳을 찾는 데 씁니다. 자세한 처리 방식은 <a>개인정보처리방침</a>에 적어 두었습니다.':'For review playback and for finding where you got stuck. The details are in our <a>Privacy Policy</a> (in Korean).',
'Provee Ground는 무료인가요?':'Is Provee Ground free?',
'네. 링크 하나로 누구나 들어올 수 있습니다. 모두 나가면 방은 10분 뒤 사라지고 기록은 남지 않습니다. <a>지금 열어 보기</a>':'Yes. Anyone can join with a link. When everyone leaves, the room disappears 10 minutes later and nothing is kept. <a>Try it now</a>',
'가격은 얼마인가요?':'How much does it cost?',
'대학생은 1과목을 무료로 쓰고, 유료 요금제는 주 4,700원부터입니다. <a>요금제 보기</a>':'University students get one subject free, and paid plans start at ₩4,700 (KRW) a week. <a>See pricing</a>',

/* ---------- 사전신청 ---------- */
'10월 15일까지 사전신청하면<br>Matcha 2주 무료':'Pre-register by October 15<br>and get 2 weeks of Matcha free',
'10월, 서강대에서 먼저 엽니다. 이메일을 남겨 주시면 저장해 두었다가, <br>여는 날 Matcha 요금제(주 6,500원) 2주 무료 혜택을 메일로 보내 드립니다.':'We open first at Sogang University in October. Leave your email and we\'ll keep it on file, <br>then send you two free weeks of the Matcha plan (₩6,500 a week) on launch day.',
'이메일':'Email',
'이메일 주소를 입력하세요':'Enter your email address',
'(필수) 사전신청 혜택 메일을 보내기 위해 이메일을 받고, 2026년 11월 30일에 지웁니다. <a>개인정보처리방침</a>':'(Required) We collect your email only to send the pre-registration offer, and delete it on November 30, 2026. <a>Privacy Policy</a>',
'개인정보처리방침':'Privacy Policy',
'이메일 주소를 확인해 주세요':'Please check your email address',
'개인정보 수집에 동의해 주세요':'Please agree to the collection of your personal information',
'보내는 중…':'Sending…',
'이미 저장된 주소예요. 10월 오픈 때 혜택 메일을 보내 드릴게요.':'That address is already on our list. We\'ll email your offer when we open in October.',
'저장했어요. 10월 오픈 때 혜택 메일을 보내 드릴게요.':'You\'re on the list. We\'ll email your offer when we open in October.',
'지금 신청이 안 돼요. 잠시 후 다시 해 주세요.':'We couldn\'t sign you up just now. Please try again in a moment.',
'지금은 Provee Ground를 무료로 써 볼 수 있어요 →':'Meanwhile, you can try Provee Ground for free →',

/* ---------- 바닥글 ---------- */
'손으로 풀어야 이해되는 과목을 위한 AI 튜터':'An AI tutor for subjects you learn with pen in hand',
'회사':'Company',
'안내':'Info',
'투자자 소개':'For investors',
'이용약관':'Terms of Service',
'URP (법인 설립 준비 중) · 대표 김수민 · © 2026 URP':'URP (incorporation in progress) · CEO Soomin Kim · © 2026 URP',
};

/* 같은 원문이라도 자리에 따라 다르게 옮길 때: [CSS 선택자, {원문: 번역}] */
const SCOPED=[
  ['#faq .sec-h h2',{'자주 묻는 질문':'Frequently asked questions'}],
];
/* 스크립트가 숫자를 넣어 만드는 글자 (정규식, 태그가 섞인 열쇠에도 쓸 수 있다) */
const RULES=[
  [/^<b>([^<]*초)<\/b> 동안 작업 중$/,'Working for <b>$1</b>'],
  [/^(\d+(?:\.\d+)?)초$/,'$1s'],
  [/^(\d+)분 (\d+)초$/,'$1m $2s'],
  [/^(\d+)분 (\d+)초 멈춤$/,'$1m $2s pause'],
  [/^(\d+)초 멈춤$/,'$1s pause'],
  [/^획 <b>([\d,]+)<\/b>개$/,'<b>$1</b> strokes'],
  [/^점 <span>([\d,]+)<\/span>개, 점마다 위치와 시각$/,'<span>$1</span> points, each with position and time'],
  [/^지운 획 <b>(\d+)<\/b>개$/,'<b>$1</b> strokes erased'],
  [/^가장 길게 <b>([^<]*)<\/b>$/,'Longest <b>$1</b>'],
  [/^([\d,]+)원$/,'₩$1'],
  [/^월 결제 시 ([\d,]+)원$/,'₩$1 if billed monthly'],
  [/^주 결제 시 ([\d,]+)원$/,'₩$1 if billed weekly'],
];
/* 한 글자씩 타이핑되는 문장: 한국어가 쳐진 비율만큼 영어를 보여 준다 */
const TYPED={
  '저 미적분 처음 듣는 1학년이고, 극한부터 헷갈려요. 공식 말고 개념부터 설명해 주세요.':'I\'m a first-year taking calculus for the first time, and limits already confuse me. Please explain the concepts first, not just formulas.',
};

/* ================= 로직 ================= */
const HAN=/[\u1100-\u11FF\u3131-\u318E\uAC00-\uD7A3]/;
const ATTRS=['aria-label','placeholder','title','data-tip','alt'];
const SKIP=new Set(['SCRIPT','STYLE','NOSCRIPT','TEMPLATE','CANVAS','VIDEO','AUDIO','IFRAME','TEXTAREA','INPUT','SELECT']);
const INLINE=new Set(['b','i','em','strong','mark','small','sup','sub','u','s','span','a','tspan','label']);
const KEY='provee.lang';
const norm=s=>s.replace(/\s+/g,' ').trim();
const keyOf=h=>norm(h.replace(/<!--[\s\S]*?-->/g,'').replace(/<([a-zA-Z][\w:-]*)\b[^>]*>/g,'<$1>').replace(/&amp;/g,'&').replace(/&nbsp;/g,' '));
const lc=n=>n.nodeName.toLowerCase();
const isBr=n=>n.nodeType===1&&lc(n)==='br';
const touched=new Set();
const missing=window.__i18nMissing=[];const missSet=new Set();
const warn=window.__i18nWarn=[];
let lang='ko',mo=null;

function lookup(k,el){
  for(const [sel,m] of SCOPED)if(m[k]!=null&&el&&el.matches&&el.matches(sel))return m[k];
  if(T[k]!=null)return T[k];
  for(const [re,to] of RULES)if(re.test(k))return k.replace(re,to);
  return null}
function typed(t){for(const ko in TYPED)if(ko.startsWith(t)){const en=TYPED[ko];return en.slice(0,Math.round(en.length*t.length/ko.length))}return null}
function miss(k){if(!k||missSet.has(k))return;missSet.add(k);missing.push(k)}
function blockKey(n){let el=n.parentElement;
  while(el&&INLINE.has(lc(el))&&el.parentElement&&[...el.parentElement.childNodes].some(c=>c.nodeType===3&&c.nodeValue.trim()))el=el.parentElement;
  return el?keyOf(el.innerHTML):norm(n.nodeValue)}
function setText(n,v){if(!('__ko' in n))n.__ko=n.nodeValue;n.nodeValue=v}
const pad=(raw,v)=>raw.match(/^\s*/)[0]+v+raw.match(/\s*$/)[0];

/* 글자 노드 하나 */
function text(n){const raw=n.nodeValue,t=norm(raw);if(!t||!HAN.test(t))return;
  let v=lookup(t,n.parentElement);if(v==null)v=typed(t);
  if(v==null){miss(blockKey(n));return}
  if(v.indexOf('<')>=0)v=v.replace(/<[^>]+>/g,'');
  setText(n,pad(raw,v));fitPill(n.parentElement)}

/* 요소 모양(태그 순서, <br> 제외)이 같은지 */
const shape=el=>[...el.childNodes].filter(c=>c.nodeType===1&&!isBr(c)).map(c=>lc(c)+'('+shape(c)+')').join(',');

/* 원래 요소는 그대로 두고 글자만 영어 틀에 맞춰 바꾼다 */
function patch(el,src){
  const old=[...el.childNodes],els=old.filter(c=>c.nodeType===1&&!isBr(c)),brs=old.filter(isBr);let ei=0,bi=0;
  const out=[...src.childNodes].map(c=>{
    if(c.nodeType===3)return document.createTextNode(c.nodeValue);
    if(isBr(c))return brs[bi++]||document.createElement('br');
    if(c.nodeType===1){const o=els[ei++];inner(o,c);return o}
    return null}).filter(Boolean);
  if(!el.__koKids){el.__koKids=old;touched.add(el)}
  el.replaceChildren(...out)}
function inner(o,c){
  if(![...c.childNodes].some(x=>x.nodeType===1)){let t=c.textContent;if(HAN.test(t)){const v=lookup(norm(t),o);if(v!=null)t=v}
    if(o.childNodes.length===1&&o.firstChild.nodeType===3){setText(o.firstChild,pad(o.firstChild.nodeValue,t));return}
    c.textContent=t}
  patch(o,c)}
/* 모양이 다르면 통째로 바꾸되, 같은 태그끼리 순서대로 속성을 옮겨 준다 */
function replace(el,src,k){
  const old=[...el.childNodes],pool={};
  el.querySelectorAll('*').forEach(e=>{(pool[lc(e)]=pool[lc(e)]||[]).push(e)});
  src.querySelectorAll('*').forEach(e=>{const o=(pool[lc(e)]||[]).shift();if(o)for(const a of o.attributes)if(!e.hasAttribute(a.name))e.setAttribute(a.name,a.value)});
  if(!el.__koKids){el.__koKids=old;touched.add(el)}
  el.replaceChildren(...src.childNodes);warn.push(k)}

function apply(el,v,k){
  if(v.indexOf('<')<0&&k.indexOf('<')<0&&el.childNodes.length===1&&el.firstChild.nodeType===3){setText(el.firstChild,pad(el.firstChild.nodeValue,v));fitPill(el);return}
  const tp=document.createElement('template');tp.innerHTML=v;
  if(shape(el)===shape(tp.content))patch(el,tp.content);else replace(el,tp.content,k)}

/* 요소 하나와 그 아래 */
function walk(el){
  if(SKIP.has(el.nodeName)||el.getAttribute('translate')==='no')return;
  const tc=el.textContent;if(!HAN.test(tc))return;
  if(tc.length<900){const k=keyOf(el.innerHTML),v=lookup(k,el);if(v!=null){apply(el,v,k);return}}
  for(const c of [...el.childNodes]){if(c.nodeType===3)text(c);else if(c.nodeType===1)walk(c)}}

function attrOne(el,a){const v=el.getAttribute(a);if(!v||!HAN.test(v)||el.closest('[translate="no"]'))return;
  const t=lookup(norm(v),el);if(t==null){miss('['+a+'] '+norm(v));return}
  if(!el.__koA)el.__koA={};if(!(a in el.__koA))el.__koA[a]=v;touched.add(el);el.setAttribute(a,t)}
function attrs(root){const list=root.querySelectorAll?[root,...root.querySelectorAll('['+ATTRS.join('],[')+']')]:[];
  for(const el of list)if(el.getAttribute)for(const a of ATTRS)if(el.hasAttribute(a))attrOne(el,a)}

/* 그래프 속 알약 모양 글자(SVG): 영어가 길면 바탕 사각형을 오른쪽으로 늘리고 글자를 그 가운데로 옮긴다 */
let cv2=null;
function fitPill(t){if(!t||lc(t)!=='text')return;const r=t.previousElementSibling;if(!r||lc(r)!=='rect'||t.getAttribute('text-anchor')!=='middle')return;
  for(const [e,a] of [[r,'width'],[t,'x']]){if(!e.__koA)e.__koA={};if(!(a in e.__koA))e.__koA[a]=e.getAttribute(a);touched.add(e)}
  const cs=getComputedStyle(t);cv2=cv2||document.createElement('canvas').getContext('2d');cv2.font=`${cs.fontWeight} ${t.getAttribute('font-size')||12}px ${cs.fontFamily}`;
  const w=Math.max(+r.__koA.width,Math.ceil(cv2.measureText(t.textContent).width)+24),x=+r.getAttribute('x');
  r.setAttribute('width',w);t.setAttribute('x',(x+w/2).toFixed(1))}

/* 문서 제목·설명 */
const head={title:null,metas:[]};
function headEn(){head.title=document.title;const v=T[norm(document.title)];if(v)document.title=v;
  head.metas=[...document.querySelectorAll('meta[name="description"],meta[property="og:title"],meta[property="og:description"]')].map(m=>{const o=m.getAttribute('content'),t=T[norm(o||'')];if(t)m.setAttribute('content',t);return [m,o]})}
function headKo(){if(head.title!=null)document.title=head.title;head.metas.forEach(([m,o])=>m.setAttribute('content',o))}

function translateAll(){attrs(document.body);walk(document.body);headEn()}
function restoreAll(){
  for(const el of touched){if(el.__koKids){el.replaceChildren(...el.__koKids);delete el.__koKids}if(el.__koA){for(const a in el.__koA)el.setAttribute(a,el.__koA[a]);delete el.__koA}}
  touched.clear();
  const w=document.createTreeWalker(document.body,NodeFilter.SHOW_TEXT);let n;while((n=w.nextNode()))if('__ko' in n){n.nodeValue=n.__ko;delete n.__ko}
  headKo()}

/* 스크립트가 나중에 그리는 글자(장면, 요금제 카드, 신청 안내)를 따라가며 번역 */
function onMut(recs){
  const roots=new Set();
  for(const r of recs){
    if(r.type==='childList'){if(r.addedNodes.length)roots.add(r.target)}
    else if(r.type==='characterData'){const n=r.target;if(n.isConnected&&HAN.test(n.nodeValue)){delete n.__ko;roots.add(n)}}
    else if(r.type==='attributes')attrOne(r.target,r.attributeName)}
  for(const x of roots){if(!x.isConnected)continue;
    if(x.nodeType===3){const p=x.parentElement;if(p&&!p.closest('[translate="no"]'))text(x);continue}
    if(x.closest('[translate="no"]'))continue;attrs(x);walk(x)}
  if(touched.size>600)for(const el of touched)if(!el.isConnected)touched.delete(el);
  mo.takeRecords()}

/* ---------- 언어 버튼 ---------- */
const css=document.createElement('style');
css.textContent=`.lang-b{display:inline-flex;align-items:center;justify-content:center;height:36px;min-width:40px;padding-inline:10px;border-radius:10px;font:600 13px/1 var(--font);letter-spacing:.02em;color:var(--ink2);transition:background .16s,color .16s}
.lang-b:hover{background:rgba(30,24,17,.05);color:var(--ink)}
.drawer-top .lang-b{margin-left:auto;margin-right:6px;height:40px;font-size:15px}
html[lang="en"] :is(h1,h2,h3){text-wrap:balance}
html[lang="en"] p{text-wrap:pretty}
@media (max-width:760px){html[lang="en"] .hero-in p br{display:none}}
html[lang="en"] .gr b{white-space:nowrap}`;
document.head.appendChild(css);
const btns=[...document.querySelectorAll('[data-lang]')];
function label(){btns.forEach(b=>{b.setAttribute('translate','no');
  if(lang==='en'){b.textContent='한국어';b.lang='ko';b.setAttribute('aria-label','한국어로 보기')}
  else{b.textContent='EN';b.lang='en';b.setAttribute('aria-label','View in English')}})}

function setLang(l,user){
  l=l==='en'?'en':'ko';
  if(l!==lang){lang=l;
    if(l==='en'){translateAll();mo=mo||new MutationObserver(onMut);mo.observe(document.body,{childList:true,subtree:true,characterData:true,attributes:true,attributeFilter:ATTRS})}
    else{if(mo)mo.disconnect();restoreAll()}
    document.documentElement.lang=l}
  label();
  if(user){try{localStorage.setItem(KEY,l)}catch(e){}
    try{const u=new URL(location.href);if(l==='en')u.searchParams.set('lang','en');else u.searchParams.delete('lang');history.replaceState(history.state,'',u)}catch(e){}}}
btns.forEach(b=>b.addEventListener('click',()=>setLang(lang==='en'?'ko':'en',true)));

let init='ko';
try{const q=new URLSearchParams(location.search).get('lang');
  if(q==='en'||q==='ko'){init=q;try{localStorage.setItem(KEY,q)}catch(e){}}
  else{let s=null;try{s=localStorage.getItem(KEY)}catch(e){}if(s==='en')init='en'}}catch(e){}
setLang(init,false);
document.documentElement.classList.remove('i18n-wait'); /* index.html 머리의 짧은 스크립트가 영어일 때 번역 전 한국어가 비치지 않게 잠깐 가려 둔 것을 푼다 */
window.__i18n={set:l=>setLang(l,true),get lang(){return lang}};
})();
